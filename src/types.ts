export interface Particle {
  id: string;
  type: 'snowflake' | 'balloon';
  x: number;            // Horizontal position as percentage of window width (e.g., 5 to 95)
  size: number;         // Element size in pixels (medium)
  duration: number;     // Duration in seconds to traverse the screen (e.g., 4 to 7 seconds)
  color: string;        // Assigned visual color hex or class
  sway: number;         // Sway width factor for custom drift
  rotationStart: number;// Degrees path start
  rotationEnd: number;  // Degrees path end
  createdAt: number;    // Timestamp of creation for state cleanup
}

export type ActiveEffect = 'none' | 'snowflake' | 'balloon' | 'both';
