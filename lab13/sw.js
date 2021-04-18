// // listen for push events & log it
// self.addEventListener('push', function(event){
//     console.log('event received')
//     // const promiseChain = self.registration.showNotification('Hello')
//     // event.waitUntil(promiseChain); //???    

//     var options = {
//         body: 'Here is a notification body!',
//         icon: 'images/example.png',
//         vibrate: [100, 50, 100],
//         data: {
//           dateOfArrival: Date.now(),
//           primaryKey: 1
//         }
//       };
//     reg.showNotification('Hello world!', options);    

//     // self.registration.showNotification('Hello')

//     // if(event.data){
//     //     // console.log('This push event has data: ', event.data.text())
//     //     const data = event.data.text();
//     //     // self.registration.showNotification(data)
//     //     const promiseChain = self.registration.showNotification('Hello')
//     //     event.waitUntil(promiseChain); //???
//     //     // self.registration.showNotification('Hello')
//     // }else{
//     //     console.log('This push has no data')
//     // }
// })

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    const notificationData = event.data.json();
  
    var title = notificationData.title;
    var options = notificationData.options;
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );

  });