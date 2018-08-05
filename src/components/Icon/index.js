import classnames from 'classnames'
import style from './index.css'

export default function Icon ({
  className,
  size = 's',
  name,
  icoStyle,
} = {}) {
  const nameClass = `icon-${name}`
  const sizeClass = `icon_size_${size}`
  const classes = classnames({
    [ style.icon ]: true,
    [ style[ nameClass ] ]: Boolean(style[ nameClass ]),
    [ style[ sizeClass ] ]: Boolean(style[ sizeClass ]),
    [ className ]: Boolean(className)
  })

  return (
    <svg xmlns="https://www.w3.org/2000/svg" className={classes} style={icoStyle}>
      <use xlinkHref={`#${name}`}></use>
      <rect height="100%" width="100%" className={style.iconBase}></rect>
    </svg>
  )
}
