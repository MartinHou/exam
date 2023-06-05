import classNames from "classnames"
import {useRef, useState} from "react"
import {InputCheckboxComponent} from "./types"

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled, onChange }) => {
  const {current: inputId} = useRef(`RampInputCheckbox-${id}`)
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": isChecked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
        onClick={() => {
          setIsChecked(!isChecked);
          onChange(!isChecked)
        }}
      />
      {/*<input*/}
      {/*  id={inputId}*/}
      {/*  type="checkbox"*/}
      {/*  className="RampInputCheckbox--input"*/}
      {/*  checked={isChecked}*/}
      {/*  disabled={disabled}*/}
      {/*/>*/}
    </div>
  )
}
