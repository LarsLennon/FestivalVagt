import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import da from "date-fns/locale/da";
registerLocale("da", da);

export default function DateTimePicker(props) {
  return (
    <DatePicker
      locale="da"
      dateFormat="dd MMMM yyyy HH:mm"
      timeFormat="HH:mm"
      showTimeSelect
      selected={props.initDate}
      onChange={(date) => props.onChange(date)}
      placeholderText={props.placeholderText}
    />
  );
}
