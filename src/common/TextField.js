function TextField({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="flex  mb-2 w-full">
        {label}
      </label>
      <input
        autoComplete="off"
        className="textField__input"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default TextField;
