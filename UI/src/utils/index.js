const USER_INFO = 'USER_INFO';

export function setUserData(userData = {}) {
  localStorage.setItem(USER_INFO, JSON.stringify(userData))
}

export function getUserData() {
  const data = localStorage.getItem(USER_INFO);
  if (!data) { return null; }

  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

export function clearOutUserData() {
  console.log('Clearing out uesr info from Local-storage');
  localStorage.removeItem(USER_INFO);
}

const downloadData = (obj) => {
  // let url = `${obj}`;
  console.log("obj",obj.e);
  let fileName = '';
  // fileName = obj.e;
  // console.log("fileName>>>",fileName)
  fileName = JSON.stringify(obj.e);
  let searchValue = (fileName.search('.docx') == -1);
  console.log("fileName+++++++++++++",fileName)
  // console.log("data",url);
// console.log("fileName>>>>>>>>>",fileName.split('ai_audios')[1].split(".wav")[0].substr(2));
// console.log("fileName>>>>>>>>>",fileName.split('ai_audios')[1].split(".docx")[0].substr(2));
let dataMatch1  =  fileName.split('ai_audios')[1].split(".wav")[0].substr(1)
console.log("wavfilemath>>>>>",dataMatch1);
let dataMatch2  =  fileName.split('ai_audios')[1].split(".docx")[0].substr(1);
console.log("docxfilemath>>>>>",dataMatch2);
  fetch(fileName, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/pdf',
  },
})
.then((response) => response.blob())
.then((blob) => {
  const url = window.URL.createObjectURL(
    new Blob([blob]),
  );
  const link = document.createElement('a');
  link.href = url;
   searchValue?
    link.setAttribute(
      'download',
     `${dataMatch1}.wav`, 
    ) :  link.setAttribute(
      'download',
     `${dataMatch2}.docx`,
    ) 

  

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);
});

}
export {
  downloadData
}