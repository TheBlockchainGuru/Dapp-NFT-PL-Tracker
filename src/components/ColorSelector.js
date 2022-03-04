import React, { useRef, useState, useEffect } from "react"
import { Button } from "react-bootstrap"

import { ColorPicker, toColor } from "react-color-palette"
import "react-color-palette/lib/css/styles.css"

import "./ColorSelector.css"

export default function ColorSelector(props) {
  const defaultColor = "#FF33CC"
  const [showColorPicker, setShowColorPicker] = useState(false)

  const wrapperRef = useRef(null)

  function colorChanged(color) {
    props.colorChanged(props.name, color.hex)
  }

  function showHidePicker() {
    setShowColorPicker(!showColorPicker)
  }

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])

  function handleClickOutside(event) {
      if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowColorPicker(false)
      }
  }

  return (
    <div className="ColorSelector">
      <h5 style={{width:"100%", marginBottom: "5px"}}>{props.title}</h5>
      <div className="ColorSelector__bubble">
        <div className="ColorSelector__bubble__color" onClick={showHidePicker} style={{backgroundColor: props.color || defaultColor}}></div>
      </div>
      <div className="ColorSelector__picker-wrapper" style={{display: showColorPicker ? "inline-block" : "none"}} ref={wrapperRef}>
        <ColorPicker width={350} height={160} color={toColor("hex",  props.color || defaultColor)} onChange={colorChanged} hideHSV />
      </div>
    </div>
  )
}