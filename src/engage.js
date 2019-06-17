var UUID = localStorage.getItem('deviceUUID');
var siteKey = "QWxDQUxicmp0MkpVbUduN2laUnJJNU9XSG5MM2hm";
buildEngagespot(UUID);

function buildEngagespot(UUID) {
  if ( navigator.vendor.includes('Apple')) {
    window.Engagespot={},q=function(e){return function(){(window.engageq=window.engageq||[]).push({f:e,a:arguments})}},f=["captureEvent","subscribe","init","showPrompt","identifyUser","clearUser"];for(k in f)Engagespot[f[k]]=q(f[k]);var s=document.createElement("script");s.type="text/javascript",s.async!=0,s.src="https://cdn.engagespot.co/EngagespotSDK.2.0.js";var x=document.getElementsByTagName("script")[0];x.parentNode.insertBefore(s,x);
    Engagespot.init(atob(siteKey));
  
    if (!UUID) {
      UUID = generateUID();
      localStorage.setItem('deviceUUID', UUID);
    }
    
    Engagespot.identifyUser(UUID);
    refreshNotifications(atob(siteKey), UUID);
  }
}

function generateUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

    
function refreshNotifications(sitekey, UUID) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let json = xmlhttp.responseText;
      let data = JSON.parse(json);
      if (data.notifications.length > 0){
        data.notifications.forEach(function(notification){
          let parsedNotification = `<div class="_notificationChild" id="notificationChild" push-uid="${notification.id}"><a id="pushWrapper" class="_enpushWrapper"><div id="notification_box" class="_ennotification_box removeShadow" style="height: 70px;"><div id="imageDiv" class="_enimageDiv"><img id="pushImage" class="_enpushImage" src="https://engagespot.co/images/bell.png"></div><div id="_enpushContent" class="_enpushContent"><div id="pushTitle" class="_enpushTitle">${notification.title}</div><div id="pushDesc" class="_enpushDesc">${notification.description}</div></div><div id="iconBox" class="_eniconBox"><img id="pushCloseIcon" class="_enpushCloseIcon" data-nid="${notification.id}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACNSURBVHjatNJRCoJAEAbgzxMq2Z0UNTVIu5K3mh5CabHspXZeduGD4Z9Z4Xv5NXJWy72eQq1MUW0xyTaSuVtUKcpNwrChq3CTpwgGoQfjetujzCB0OqF/tt4j6ITQrM/36CKE9jPKjEKjPWp3FS6gX5OmqDBv2dakkyJF1W6Y836Y5Zu1VE5/+gXH9RgAMijgXQ+LWIUAAAAASUVORK5CYII="><img id="pushHeartIcon" class="_enpushHeartIcon noMoreLove" data-nid="257631" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAE1SURBVHjalNDPK99xHAfwR3wdNAc/QlyWG5dx46SknZdkWw7YfyC1kstKc6J8o11WbssFbbWVZi6U5Cbtxx8wDkLInEwvh8+X7/fLR/F6nZ6v9+Pd+91LeFh7BARNPthzZtNrGRn9tvyza9ZT3MAKM85zV395ocefXDqX9eQatpkQfujWYsSRCxcODWvW5bsw7lkC5x1aV5X8QZddf3XmUpU1Bz4l8EAYkK9WrQVpUNhP4Inw0n31SjhO4KrwUSaVlZlzaSWBfZaE9lTYISzqTWC5505tq73D6u040a08v/Ax4YvKIlbtmzBauHCYFhbU3LBan4WpJBTCMrPCV3W5R5eFrNK7kIyssK5eow1hMr+JYkiJ98JPv4V3hQe3Ibx16b/h4mEa5I2h26N02KghFT6srwYA6Zyz4CiBK8AAAAAASUVORK5CYII="><div id="pushDate" class="_enpushDate" style="right: 3px;">3h</div></div></div></a></div>`;
          let notificationChildDiv = document.createElement('div');
          notificationChildDiv.innerHTML = parsedNotification;

          if(document.getElementById('ncBody')) {
            let msgs = document.getElementById('ncBody');
            if(data.notifications.length > msgs.childNodes.length ) {

              if (msgs.childNodes.length > 0) {
                msgs.childNodes.forEach( function(item){

                  let childrenMsg = document.getElementById('notificationChild');
                  if (childrenMsg !== null) {
                    if (notification.id !== childrenMsg.getAttribute('push-uid')) {
                      document.getElementById('ncBody').appendChild(notificationChildDiv);
                      const increment = data.notifications.length - msgs.childNodes.length ;
                      document.getElementById('unreadNotificationCount').innerText = increment.toString();
                      document.getElementById('unreadNotificationCount').style.display = 'block';
                    }
                  }
                })
              } else {
                document.getElementById('ncBody').appendChild(notificationChildDiv);
                const increment = data.notifications.length - msgs.childNodes.length ;
                document.getElementById('unreadNotificationCount').innerText = increment.toString();
                document.getElementById('unreadNotificationCount').style.display = 'block';
              }

            }

          }
          
        });
      }

      setTimeout(() => {
        refreshNotifications(atob(siteKey), UUID)
      }, 10000);
    
  }
};
  xmlhttp.open("GET", `https://internalapi.engagespot.co/v2/fetch_notifications.php?siteKey=${atob(siteKey)}&user=8831cacd-82b1-41db-8857-a2e8282f0674`, true);
  xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
  xmlhttp.setRequestHeader('Content-type', 'application/ecmascript');
  xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlhttp.send();
}
