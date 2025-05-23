import { define } from '@nodusjs/std/directive'
import { paint } from '@nodusjs/std/dom'
import Text, { component, style } from '@typography/text'
import { style as restyle } from './style'

@define('x-heading')
@paint(component, style, restyle)
class Heading extends Text {}

export default Heading
