import { useState } from "react";
import { Input } from "../ui/input";

export function ColorInput({
    value,
    onChange,
    placeholder,
  }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
    const [inputValue, setInputValue] = useState(value && value.startsWith("#") ? value : value ? `#${value}` : "")
  
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value
      setInputValue(newColor)
      onChange(newColor)
    }
  
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value
  
      if (newValue && !newValue.startsWith("#")) {
        newValue = `#${newValue}`
      }
  
      setInputValue(newValue)
      onChange(newValue)
    }
  
    const handleBlur = () => {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  
      if (inputValue && !hexRegex.test(inputValue)) {
        const defaultColor = "#FFFFFF"
        setInputValue(defaultColor)
        onChange(defaultColor)
      }
    }
  
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-md border flex-shrink-0" style={{ backgroundColor: inputValue || "#FFFFFF" }} />
        <div className="flex-1 relative">
          <Input
            type="text"
            value={inputValue}
            onChange={handleTextChange}
            onBlur={handleBlur}
            placeholder={placeholder || "Enter color code (e.g. #FFFFFF)"}
            className="pr-12"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Input
              type="color"
              value={inputValue || "#FFFFFF"}
              onChange={handleColorChange}
              className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer"
            />
          </div>
        </div>
      </div>
    )
  }