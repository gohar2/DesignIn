import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
let DOMS = [];
export const downloadImagewithname =
  (extension, fname, loader) => (source, pages, element) => () => {
    let link = null;

    pages.forEach((id) => {
      source(
        (() => {
          let dom = document.getElementById(`${element}${id}`);
          for (var i = 0; i < dom.children.length; i++) {
            dom.children[i].style.border = '0px';
            if (dom.children[i].children.length > 0)
              dom.children[i].children[0].style.border = '0px';
          }
          let d = {
            domdom: dom,
            transform: dom.style.transform,
            left: dom.style.marginLeft ? dom.style.marginLeft : null,
            right: dom.style.marginRight ? dom.style.marginRight : null,
            top: dom.style.marginTop ? dom.style.marginTop : null,
            bottom: dom.style.marginBottom ? dom.style.marginBottom : null,
            border: dom.style.border ? dom.style.border : null,
            shadow: dom.style.boxShadow ? dom.style.boxShadow : null,
          };
          DOMS.push(d);
          dom.style.transform = '';
          dom.style.marginLeft = 0;
          dom.style.marginRight = 0;
          dom.style.marginBottom = 0;
          dom.style.marginTop = 0;
          dom.style.border = '0px';
          dom.style.boxShadow = 'none';

          return dom;
        })(),
        { crossorigin: 'anonymous' },
      ).then(function (dataUrl) {
        const image = new Image();
        image.src = dataUrl;
        var newDiv = document.createElement('DIV');
        newDiv.style.height = document.getElementById(
          `${element}${id}`,
        ).style.height;
        newDiv.style.width = document.getElementById(
          `${element}${id}`,
        ).style.width;
        newDiv.style.backgroundImage = `url(${dataUrl})`;
        newDiv.style.zIndex = '-1';
        newDiv.id = 'newDivId';
        document.getElementById('page0').appendChild(newDiv);
        source(document.getElementById('newDivId')).then(function (dataUrl) {
          imageResetting();
          link = document.createElement('a');
          link.download = joinStringWithSeparator([fname, extension], '.');
          link.href = dataUrl;
          link.click();
          imageResetting();
          newDiv.remove();
          loader()(false);
        });
      });
    });
  };

const imageResetting = () => {
  DOMS.forEach((el) => {
    el.domdom.style.transform = el.transform;
    el.domdom.style.marginLeft = el.left;
    el.domdom.style.marginRight = el.right;
    el.domdom.style.marginBottom = el.bottom;
    el.domdom.style.marginTop = el.top;
    el.domdom.style.border = null;
    el.domdom.style.boxShadow = null;
  });
};

export const downloadPDFwithName = (fname) => (pages, element) => () => {
  const pagesLength = pages.length,
    xCoOrdinates = 0,
    yCoOrdicates = 0;
  let pdf = new jsPDF('l', 'pt', [475, 500]),
    pageIterator = 1,
    pageHeight = 0,
    pageWidth = 0;

  pages.forEach((id) => {
    var container = document.getElementById(`${element}${id}`);
    html2canvas(container, { allowTaint: true, useCORS: true }).then(
      (canvas) => {
        pageWidth = pdf.internal.pageSize.getWidth();
        pageHeight = pdf.internal.pageSize.getHeight();
        var imgData = canvas.toDataURL('image/png');
        pdf.addImage(
          imgData,
          'JPEG',
          xCoOrdinates,
          yCoOrdicates,
          pageWidth,
          pageHeight,
          `${element} ${id}`,
        );
        if (pageIterator < pagesLength) {
          pdf.addPage();
        }
        if (pageIterator === pagesLength) {
          pdf.save(joinStringWithSeparator([fname, 'pdf'], '.'));
        }
        pageIterator++;
      },
    );
  });
};

const joinStringWithSeparator = (toBeStrings, separator) => {
  let joinedStrings = '';
  if (toBeStrings.length > 0) {
    return toBeStrings.join(separator);
  }
  return joinedStrings;
};
