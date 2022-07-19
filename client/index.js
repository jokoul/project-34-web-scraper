function newEl(type, attrs = {}) {
  const el = document.createElement(type);
  for (let attr in attrs) {
    const value = attrs[attr];
    if (attr == "innerText") el.innerText = value;
    else el.setAttribute(attr, value);
  }
  return el;
}

function submitUrlHeading() {
  const siteUrl = document.querySelector(".urlInput").value;
  //send to server
  fetch("http://localhost:3000/siteinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: siteUrl }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // data = data.articles;
      // console.log(data);
      let h1Array = data.filter((item) => {
        console.log(item);
        return item.siteTitle !== undefined;
      });
      console.log(h1Array);
      let h2Array = data.filter((item) => {
        return item.siteTitle2 !== undefined;
      });
      console.log(h2Array);
      let h3Array = data.filter((item) => {
        return item.siteTitle3 !== undefined;
      });
      console.log(h3Array);

      const ctr = document.querySelector(".container");
      const ctr2 = document.querySelector(".container2");
      const ctr3 = document.querySelector(".container3");
      if (h1Array.length == 0) {
        const heading1 = newEl("p", {
          innerText: "No heading level 1 in the page ",
        });
        ctr.appendChild(heading1);
      } else {
        h1Array.forEach((title) => {
          const heading1 = newEl("p", { innerText: title.siteTitle });
          ctr.appendChild(heading1);
        });
      }
      if (h2Array.length == 0) {
        const heading2 = newEl("p", {
          innerText: "No heading level 2 in the page",
        });
        ctr2.appendChild(heading2);
      } else {
        h2Array.forEach((title) => {
          const heading2 = newEl("p", { innerText: title.siteTitle2 });
          ctr2.appendChild(heading2);
        });
      }
      if (h3Array.length == 0) {
        const heading3 = newEl("p", {
          innerText: "No heading level 3 in the page",
        });
        ctr3.appendChild(heading3);
      } else {
        h3Array.forEach((title) => {
          const heading3 = newEl("p", { innerText: title.siteTitle3 });
          ctr3.appendChild(heading3);
        });
      }
    });
}

function submitUrlScreenshot() {
  const siteUrl = document.querySelector(".urlInput2").value;
  //send to server
  fetch("http://localhost:3000/siteimage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: siteUrl }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
