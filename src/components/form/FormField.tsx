import TextFormField from './TextFormField'
import RichTextFormField from './RichTextFormField'
import MultiSelectFormField from './MultiSelectFormField'
import MultiSelectAutocompleteFormField from './MultiSelectAutocompleteFormField' // نسخه freeSolo

type FormFieldProps =
  | ({ type?: 'text' } & React.ComponentProps<typeof TextFormField>)
  | ({ type: 'richtext' } & React.ComponentProps<typeof RichTextFormField>)
  | ({ type: 'multiselect' } & React.ComponentProps<typeof MultiSelectFormField>)
  | ({ type: 'multiselect-autocomplete' } & React.ComponentProps<typeof MultiSelectAutocompleteFormField>)

const FormField: React.FC<FormFieldProps> = props => {
  switch (props.type) {
    case 'richtext':
      return <RichTextFormField {...props} />
    case 'multiselect':
      return <MultiSelectFormField {...props} />
    case 'multiselect-autocomplete':
      return <MultiSelectAutocompleteFormField {...props} />
    default:
      return <TextFormField {...props} />
  }
}

export default FormField
