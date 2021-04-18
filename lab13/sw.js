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
  
    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = 'https://logos-world.net/wp-content/uploads/2020/08/Google-Chrome-Logo-2011-2014.png';
    var tag = 'simple-push-demo-notification-tag';
    var data = {
      doge: {
          wow: 'such amaze notification data'
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag,
        data: data
      })
    );
  });