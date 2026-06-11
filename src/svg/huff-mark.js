import React from 'react'
import Svg from './svg'

// Use public URL to avoid SVGR parsing of namespaced SVG
const HuffMarkData = '/svg/huff-mark.svg'

const HuffMark = () => {
  return (
    <Svg src={HuffMarkData} />
  )
}

export default HuffMark
