import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import reactImageSize from 'react-image-size';
import './Rightside.css';

export const Rightside = (props) => {

  const {tableCell} = props

  let imageUrl = tableCell.backgroundImage
  let layout = tableCell.layout
  let mainLabelText = tableCell.mainLabel.text
  let mainLabelColor = tableCell.mainLabel.fontColor
  let mainLabelSize = tableCell.mainLabel.fontSize
  let secondaryLabelText = tableCell.secondaryLabel.text
  let secondaryLabelColor = tableCell.secondaryLabel.fontColor
  let secondaryLabelSize = tableCell.secondaryLabel.fontSize

  const [cellHeight, setCellHeight] = useState('72px')

  useEffect(async () => {
    try {
      const { width, height } = await reactImageSize(imageUrl);
      console.error('hihihi', width, height);
      let cellEles = document.getElementById('cell')
      let cellEleWidth = cellEles.offsetWidth
      let cellEleHeight = Math.floor(height * cellEleWidth / width)
      console.log(cellEleHeight, height, cellEleWidth, width)
      setCellHeight(cellEleHeight+'px')
      console.log(cellHeight)

    } catch {
      setCellHeight('72px')
      console.log("get image size error")
    }
  }, [imageUrl])


    return (
      <div id="cell" style={{backgroundImage:`url(${imageUrl})`, backgroundSize:'100% auto', backgroundRepeat:'no-repeat', minHeight:cellHeight, width:'375px'}}>
        {
          layout == '1'?
            <p style={{wordBreak: 'break-word', margin:'0', fontWeight:'bold', fontSize:mainLabelSize+'px', color:mainLabelColor}}> {mainLabelText} </p> 
            :
            <>
              <p style={{minHeight:'50%', wordBreak: 'break-word', margin:'0', fontWeight:'bold', fontSize:mainLabelSize+'px', color:mainLabelColor }}> {mainLabelText} </p> 
              <p style={{minHeight:'50%', wordBreak: 'break-word', margin:'0', fontSize:secondaryLabelSize+'px', color:secondaryLabelColor }}> {secondaryLabelText} </p> 
            </>
        }
      </div>

    )
}