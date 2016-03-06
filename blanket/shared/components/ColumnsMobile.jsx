
export const ColumnsMobile = ({children, className}) => <div className={`columns is-mobile ${className || ''}`}>
      {children}
</div>

export const Column = ({children, className}) => <div className={`column ${className || ''}`}>
      {children}
</div>
