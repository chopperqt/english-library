import { useState } from "react";

const TestComponent = () => {
  const [value, setValue] = useState('')

  return (
    <div data-testid="test-field-wrap">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid='test-field'
      />
      {value === '123' && (
        <div data-testid='test-field-error'>
          Test
        </div>
      )}
    </div>
  );
}

export default TestComponent;