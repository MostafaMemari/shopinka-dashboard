import TextFormField from './TextFormField'
import RichTextFormField from './RichTextFormField'
import MultiSelectFormField from './MultiSelectFormField'
import MultiSelectAutocompleteFormField from './MultiSelectAutocompleteFormField' // نسخه freeSolo
import ColorPickerFormField from './ColorPickerHexField'
import GradientPickerFormField from './GradientPickerFormField'
import SwitchFormField from './SwitchFormField'
import ColorPickerRgbaField from './ColorPickerRgbaField'

type FormFieldProps =
  | ({ type?: 'text' } & React.ComponentProps<typeof TextFormField>)
  | ({ type: 'richtext' } & React.ComponentProps<typeof RichTextFormField>)
  | ({ type: 'multiselect' } & React.ComponentProps<typeof MultiSelectFormField>)
  | ({ type: 'multiselect-autocomplete' } & React.ComponentProps<typeof MultiSelectAutocompleteFormField>)
  | ({ type: 'color' } & React.ComponentProps<typeof ColorPickerFormField>)
  | ({ type: 'color-rgba' } & React.ComponentProps<typeof ColorPickerRgbaField>)
  | ({ type: 'gradient' } & React.ComponentProps<typeof GradientPickerFormField>)
  | ({ type: 'switch' } & React.ComponentProps<typeof SwitchFormField>)

const FormField: React.FC<FormFieldProps> = props => {
  switch (props.type) {
    case 'richtext':
      return <RichTextFormField {...props} />
    case 'multiselect':
      return <MultiSelectFormField {...props} />
    case 'multiselect-autocomplete':
      return <MultiSelectAutocompleteFormField {...props} />
    case 'color':
      return <ColorPickerFormField {...props} />
    case 'color-rgba':
      return <ColorPickerRgbaField {...props} />
    case 'gradient':
      return <GradientPickerFormField {...props} />
    case 'switch':
      return <SwitchFormField {...props} />
    default:
      return <TextFormField {...props} />
  }
}

export default FormField
