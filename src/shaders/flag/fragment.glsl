precision mediump float;

varying float vElevation;

void main() {
    vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    color.rgb += vElevation;
    gl_FragColor = color;
}