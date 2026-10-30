chrome.runtime.onInstalled.addListener(()=>chrome.contextMenus.create({id:'pop-inspect',title:'Inspect this link with Pop',contexts:['link']}));
chrome.contextMenus.onClicked.addListener(info=>{if(info.menuItemId==='pop-inspect'&&info.linkUrl){chrome.windows.create({url:chrome.runtime.getURL('panel.html')+'#'+encodeURIComponent(info.linkUrl),type:'popup',width:430,height:650});}});
