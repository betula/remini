import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { box, read, useWrite } from 'remini';

describe('should work', () => {

  test('useWrite', () => {
    const h = box(0);

    function A() {
      const [val, setVal] = React.useState(1);
      useWrite(h, val);
      return <button onClick={() => setVal((v) => v + 1)} />;
    }

    render(<A />);
    expect(read(h)).toBe(1);

    fireEvent.click(screen.getByRole('button'));
    expect(read(h)).toBe(2);

    fireEvent.click(screen.getByRole('button'));
    expect(read(h)).toBe(3);
  });

});