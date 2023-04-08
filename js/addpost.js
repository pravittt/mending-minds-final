function addPost(){
  let words = document.getElementById("usertext").value
  let swearwords = words.includes("bad word"); //we can create a big list of swear words that we don't want to see on our website. But we did not want to include these swear words in our code and especilly demonstrate them during the presentation because that would be ill-mannered. That is why we used "bad word".  
  let websitesca = words.includes(".ca");
  let websitescom = words.includes(".com"); //.ca and .com are just 2 examples. We can add much more domain names, but there is no need to clutter up our code with too many extra stuff, because for the demostration we only needed to show one example of how we will prevent adding links to the comments.


if (swearwords == true) {
  alert('Please do not use profanity in your comments! Remove swear words from your comment and submit it again!')
} 
else if (websitesca == true) {
  alert('Please do not include any links in your comments! Remove links from your comment and submit it again!')
}
else if (websitescom == true) {
  alert('Please do not include any links in your comments! Remove links from your comment and submit it again!')
} 
else {

  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let ampm = 'am'

  if(month == 2) {
    month = 'March'
  }
  if(month == 3) {
    month = 'April'
  }

  if(hour == 12) {
    ampm = 'pm'
  }

  if(hour > 12) {
    hour = hour - 12
    ampm = 'pm'
  }

  if(hour < 10) {
    hour = '0' + hour  
  }

  if(minute < 10) {
    minute = '0' + minute  
  }

  const str = 'Posted: ' + day + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ' ' + ampm;

  const para = document.createElement("p");
  const node = document.createTextNode(str);
  para.appendChild(node);

  var table = document.getElementById("posts");
  var content = document.getElementById("usertext").value;

  const para2 = document.createElement("p");
  const node2 = document.createTextNode(content);
  para2.appendChild(node2);

  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "<img src='images/cat.jpg'><p>Bogdan</p>";
  cell2.appendChild(para)
  cell2.appendChild(para2)

  document.getElementById("usertext").value = ''
  alert('Your comment was posted!')
}
}