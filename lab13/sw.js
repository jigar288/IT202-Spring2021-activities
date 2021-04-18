// listen for push events & log it
self.addEventListener('push', function(event){
    if(event.data){
        // console.log('This push event has data: ', event.data.text())
        const data = event.data.text();
        // self.registration.showNotification(data)
        const promiseChain = self.registration.showNotification('Hello')
        event.waitUntil(promiseChain); //???
        // self.registration.showNotification('Hello')
    }else{
        console.log('This push has no data')
    }
})