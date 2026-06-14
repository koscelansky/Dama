import React from 'react'
import Svg from './svg'

// Use public URL to avoid SVGR parsing of namespaced SVG
const CaptureMarkData = '/svg/capture-mark.svg'

const CaptureMark = () => {
  return <Svg src={CaptureMarkData} />
}

export default CaptureMark
