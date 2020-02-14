const printPDF = () => {
  const tableToPrint = document.getElementById('printableTable')
  const withCSS = `<style type="text/css"> 
                            table { border-collapse: collapse; }
                            table th, table td { border: 0.5px solid #000; padding: 0.5rem; margin: 0 } 
                            .fa-sort { display: none }
                            @media print {
                                .noprint {display: none;}
                            }
                   </style>`
  const printWindow = window.open('')
  printWindow.document.write(tableToPrint.outerHTML + withCSS)
  printWindow.print()
  printWindow.close()
}

export default printPDF
