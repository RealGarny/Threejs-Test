varying vec2 vUv;
void main() {
    float strength =  step(0.7, mod(vUv.y * 10.0, 1.0));
    vec4 color = vec4(strength, strength,strength, 1.0);
    gl_FragColor = color;
}