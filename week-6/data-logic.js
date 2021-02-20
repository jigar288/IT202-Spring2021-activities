const initIndexDB = () => {
    const db = new Dexie("school_report_db");

    db.version(1).stores({
      schools: 'long_name,student_attainment_rating,student_attendance_year_1,school_type, address, website'
    });

    return db;
}

const db =  initIndexDB();

const loadDataToIndexDB =  (data, db, callback) => {

    console.info(`Received data of length ${data.length} & loading it into index db`)

    data.forEach( (schoolReport) => {
        const student_attendance_year_1 = parseFloat(schoolReport.student_attendance_year_1)

        db.schools.add({
            long_name: schoolReport.long_name,
            student_attainment_rating: schoolReport.student_attainment_rating,
            student_attendance_year_1: student_attendance_year_1,
            school_type: schoolReport.school_type,
            address: schoolReport.address,
            website: schoolReport.website
        }).then( () => {
            callback()
        })
    });

}

const fetchSchoolReportData = (apiURL, callback) => {            
    fetch(apiURL)
    .then ( (response) => {return response.json() })
    .then ( (data) => {
        loadDataToIndexDB(data, db, callback)
    }).catch( (error)  => {
        console.error(`problem trying to fetch school data for url ${apiURL} w/ error: ${error}`)
    });             
}

const displayNumAvgSchoolAttainmentRating = (numAvgSchoolAttainmentRating) => {
    document.querySelector('#question4b').innerHTML = numAvgSchoolAttainmentRating
}

const getNumAvgSchoolAttainmentRating = (callback) => {    
    db.schools
    .where('student_attainment_rating')
    .equals('AVERAGE')
    .count()
    .then( (numAvgSchoolAttainmentRating) => {
        callback(numAvgSchoolAttainmentRating)
    })
}

const displayNintyEightPercentAttendenceSchools = (ninetyEightPercentAttendanceSchools) => {
    let ninetyEightPercentAttendanceSchoolsString = "";
    ninetyEightPercentAttendanceSchools.forEach( (school) => {
        ninetyEightPercentAttendanceSchoolsString += school.long_name + ', '
    })

    document.querySelector('#question4c').innerHTML = ninetyEightPercentAttendanceSchoolsString    
}

const getNinetyEightPercentAttendanceSchools = (callback) => {
    db.schools
    .where('student_attendance_year_1')
    .aboveOrEqual(98.0)
    .toArray()
    .then( (ninetyEightPercentAttendanceSchools) => {
        callback(ninetyEightPercentAttendanceSchools)
    })
}

const displaySchoolsNamesBeginWithK = (data) => {
    let schoolsNamesBeginWithK = "";
    data.forEach( (school) => {
        schoolsNamesBeginWithK += school.long_name + ', '
    })
    document.querySelector('#question4d').innerHTML = schoolsNamesBeginWithK  
}

const getSchoolsNamesBeginWithK = (callback) => {
    db.schools
    .where('long_name')
    .startsWith('K')
    .toArray()
    .then( (schoolsNamesBeginWithK) => {
        console.log(schoolsNamesBeginWithK)
        callback(schoolsNamesBeginWithK)
    })
}   

const displayNonCharterSchools = (numNonCharterSchools) => {
    document.querySelector('#question4e').innerHTML = numNonCharterSchools
}

const getNonCharterSchools = (callback) => {
    db.schools
    .where('school_type')
    .notEqual('Charter')
    .count()
    .then( (numNonCharterSchools) => {
        callback(numNonCharterSchools)
    })
}

const displayNumAllSchools = (numAllSchools) => {
    document.querySelector('#question4a').innerHTML = numAllSchools
}

const countNumAllSchools = (callback) => {
    db.schools.count().then( (numAllSchools) => {
        callback(numAllSchools)
    })
}

const calculateAndDisplayData = () => {
    countNumAllSchools(displayNumAllSchools)

    getNumAvgSchoolAttainmentRating(displayNumAvgSchoolAttainmentRating);

    getNinetyEightPercentAttendanceSchools(displayNintyEightPercentAttendenceSchools)

    getSchoolsNamesBeginWithK(displaySchoolsNamesBeginWithK)

    getNonCharterSchools(displayNonCharterSchools)
}

const generateSchoolReport = () => {
    db.schools.toArray().then( (data) => {

        if(data.length == 0){
            const apiURL = 'https://data.cityofchicago.org/resource/dw27-rash.json'
            fetchSchoolReportData(apiURL, calculateAndDisplayData);
        }else{
            calculateAndDisplayData()            
        }
    
    })
}

generateSchoolReport();