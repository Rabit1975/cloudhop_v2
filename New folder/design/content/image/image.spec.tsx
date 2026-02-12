import React from 'react';
import { render } from '@testing-library/react';
import { Image } from './image.js';
import styles from './image.module.scss';

describe('Image Component', () => {
  it('should render the image with default props', () => {
    const { container } = render(<Image />);
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass(styles.image);
    expect(image).toHaveAttribute('src', 'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_sleek_digital_0_1770832602892.png');
    expect(image).toHaveAttribute('alt', 'CloudHop visual');
  });

  it('should render the image with provided props', () => {
    const src = 'test-src.jpg';
    const alt = 'test alt';
    const width = 200;
    const height = 100;
    const className = 'custom-class';

    const { container } = render(
      <Image src={src} alt={alt} width={width} height={height} className={className} />
    );

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', src);
    expect(image).toHaveAttribute('alt', alt);
    expect(image).toHaveAttribute('width', width.toString());
    expect(image).toHaveAttribute('height', height.toString());
    expect(image).toHaveClass(className);
    expect(image).toHaveClass(styles.image);
  });
});