import Admin from '@/shared/icons/admin'
import Calendar from '@/shared/icons/calendar'
import Camera from '@/shared/icons/camera'
import Capture from '@/shared/icons/capture'
import Caret from '@/shared/icons/caret'
import Chevron from '@/shared/icons/chevron'
import Close from '@/shared/icons/close'
import Comment from '@/shared/icons/comment'
import ControlButton from '@/shared/icons/control-button'
import ControlKeyboard from '@/shared/icons/control-keyboard'
import ControlTable from '@/shared/icons/control-table'
import ControlTextfield from '@/shared/icons/control-textfield'
import Copy from '@/shared/icons/copy'
import Details from '@/shared/icons/details'
import Directory from '@/shared/icons/directory'
import Execution from '@/shared/icons/execution'
import Export from '@/shared/icons/export'
import FileData from '@/shared/icons/file-data'
import Flow from '@/shared/icons/flow'
import Folder from '@/shared/icons/folder'
import GripBar from '@/shared/icons/grip-bar'
import Import from '@/shared/icons/import'
import Info from '@/shared/icons/info'
import Magic from '@/shared/icons/magic'
import Mobile from '@/shared/icons/mobile'
import NotOk from '@/shared/icons/not-ok'
import Ok from '@/shared/icons/ok'
import Paste from '@/shared/icons/paste'
import Pen from '@/shared/icons/pen'
import PlayOutline from '@/shared/icons/play-outline'
import PlusIcon from '@/shared/icons/plus-icon'
import Queued from '@/shared/icons/queued'
import Report from '@/shared/icons/report'
import Repository from '@/shared/icons/repository'
import RightArrow from '@/shared/icons/right-arrow'
import Screen from '@/shared/icons/screen'
import SearchIcon from '@/shared/icons/search-icon'
import Suite from '@/shared/icons/suite'
import Terminated from '@/shared/icons/terminated'
import Test from '@/shared/icons/test'
import TestCase from '@/shared/icons/test-case'
import Tools from '@/shared/icons/tools'
import Trash from '@/shared/icons/trash'
import TypeWeb from '@/shared/icons/type-web'
import Upload from '@/shared/icons/upload'
import Utilities from '@/shared/icons/utilities'
import Wait from '@/shared/icons/wait'
import type { SVGProps } from 'react'
import type React from 'react'

export const iconNames = [
  'test',
  'admin',
  'calendar',
  'camera',
  'capture',
  'caret',
  'chevron',
  'close',
  'comment',
  'control-button',
  'control-keyboard',
  'control-table',
  'control-textfield',
  'copy',
  'details',
  'directory',
  'execution',
  'export',
  'file-data',
  'flow',
  'folder',
  'grip-bar',
  'import',
  'info',
  'magic',
  'mobile',
  'not-ok',
  'ok',
  'paste',
  'pen',
  'play-outline',
  'plus-icon',
  'queued',
  'report',
  'repository',
  'right-arrow',
  'screen',
  'search-icon',
  'suite',
  'terminated',
  'test-case',
  'tools',
  'trash',
  'type-web',
  'upload',
  'utilities',
  'wait',
] as const

export type IconName = (typeof iconNames)[number]

export const iconRegistry = new Map<
  IconName,
  React.ComponentType<SVGProps<SVGSVGElement>>
>([
  ['test', Test],
  ['admin', Admin],
  ['calendar', Calendar],
  ['camera', Camera],
  ['capture', Capture],
  ['caret', Caret],
  ['chevron', Chevron],
  ['close', Close],
  ['comment', Comment],
  ['control-button', ControlButton],
  ['control-keyboard', ControlKeyboard],
  ['control-table', ControlTable],
  ['control-textfield', ControlTextfield],
  ['copy', Copy],
  ['details', Details],
  ['directory', Directory],
  ['execution', Execution],
  ['export', Export],
  ['file-data', FileData],
  ['flow', Flow],
  ['folder', Folder],
  ['grip-bar', GripBar],
  ['import', Import],
  ['info', Info],
  ['magic', Magic],
  ['mobile', Mobile],
  ['not-ok', NotOk],
  ['ok', Ok],
  ['paste', Paste],
  ['pen', Pen],
  ['play-outline', PlayOutline],
  ['plus-icon', PlusIcon],
  ['queued', Queued],
  ['report', Report],
  ['repository', Repository],
  ['right-arrow', RightArrow],
  ['screen', Screen],
  ['search-icon', SearchIcon],
  ['suite', Suite],
  ['terminated', Terminated],
  ['test-case', TestCase],
  ['tools', Tools],
  ['trash', Trash],
  ['type-web', TypeWeb],
  ['upload', Upload],
  ['utilities', Utilities],
  ['wait', Wait],
] as const)
