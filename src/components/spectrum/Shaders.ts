// Shaders for Spectrum visualization effects

export const nebulaVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const nebulaFragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float bass;
  uniform float energy;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Fractal noise
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    
    // Animated noise
    float n1 = fbm(uv * 3.0 + time * 0.1);
    float n2 = fbm(uv * 2.0 - time * 0.15);
    float n3 = fbm(uv * 4.0 + vec2(time * 0.2, -time * 0.1));
    
    // Combine noise with bass
    float combined = (n1 + n2 + n3) / 3.0;
    combined = pow(combined, 1.0 - bass * 0.5);
    
    // Create nebula colors
    vec3 color = mix(color1, color2, n1);
    color = mix(color, color3, n2);
    
    // Add energy-based brightness
    float brightness = intensity * (1.0 + energy * 0.5);
    color *= brightness;
    
    // Fade at edges
    float dist = length(uv);
    float fade = smoothstep(1.2, 0.0, dist);
    
    gl_FragColor = vec4(color * fade, combined * fade * 0.8);
  }
`

export const particleVertexShader = `
  uniform float time;
  uniform float bass;
  uniform float energy;
  uniform float scale;
  
  attribute float size;
  attribute vec3 color;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vColor = color;
    
    vec3 pos = position;
    
    // Pulse with bass
    float pulse = 1.0 + bass * 0.3;
    pos *= pulse;
    
    // Drift with time
    pos.x += sin(time * 0.5 + position.y) * energy * 0.5;
    pos.y += cos(time * 0.3 + position.x) * energy * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size based on distance and energy
    float finalSize = size * scale * (1.0 + energy * 0.5);
    gl_PointSize = finalSize * (300.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
    
    // Alpha based on distance
    vAlpha = 1.0 - smoothstep(0.0, 50.0, length(mvPosition.xyz));
  }
`

export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Circular particle
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Soft edges
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    alpha *= vAlpha;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`

export const glyphVertexShader = `
  uniform float time;
  uniform float resonance;
  
  varying vec2 vUv;
  varying float vResonance;
  
  void main() {
    vUv = uv;
    vResonance = resonance;
    
    vec3 pos = position;
    
    // Pulse with resonance
    float pulse = 1.0 + sin(time * 2.0) * resonance * 0.1;
    pos *= pulse;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const glyphFragmentShader = `
  uniform float time;
  uniform vec3 glowColor;
  
  varying vec2 vUv;
  varying float vResonance;
  
  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);
    
    // Create sacred geometry pattern
    float angle = atan(center.y, center.x);
    float segments = 6.0;
    float segmentAngle = mod(angle, 3.14159 * 2.0 / segments) * segments;
    
    float pattern = sin(segmentAngle * 3.0 + time) * 0.5 + 0.5;
    pattern *= sin(dist * 10.0 - time * 2.0) * 0.5 + 0.5;
    
    // Glow
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 2.0);
    
    // Combine with resonance
    vec3 color = glowColor * (pattern * 0.5 + glow) * (0.5 + vResonance * 0.5);
    float alpha = glow * (0.3 + vResonance * 0.7);
    
    gl_FragColor = vec4(color, alpha);
  }
`
