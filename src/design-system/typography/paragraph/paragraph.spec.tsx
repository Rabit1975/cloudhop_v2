import { render } from '@testing-library/react';
import { Paragraph } from './paragraph.js';
import styles from './paragraph.module.scss';

describe('Paragraph', () => {
  it('should render children content', () => {
    const { container } = render(<Paragraph>Hello World</Paragraph>);
    expect(container.textContent).toBe('Hello World');
  });

  it('should apply the correct size class', () => {
    const { container } = render(<Paragraph size="large">Large Text</Paragraph>);
    const paragraphElement = container.querySelector(`.${styles.paragraph}`) as HTMLParagraphElement;
    expect(paragraphElement.className).toContain(styles.large);
  });

  it('should render with a custom element', () => {
    const { container } = render(<Paragraph element="span">Custom Element</Paragraph>);
    const spanElement = container.querySelector('span');
    expect(spanElement).not.toBeNull();
    expect(spanElement?.textContent).toBe('Custom Element');
  });
});