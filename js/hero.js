/* Section 1 — HERO: WebGL shader + logo glow */
(function initHero() {
  const canvas = document.getElementById('hero-canvas');
  const logo = document.getElementById('hero-logo');
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lcx, lcy, lw, lh;
  let heroDead = false;

  /* Static fallback: if WebGL is unavailable or the context is lost,
     a CSS gradient sunrise takes over — never a white void */
  function heroFallback() {
    heroDead = true;
    document.getElementById('s-hero').classList.add('hero-fallback');
  }

  let gl = null;
  try { gl = canvas.getContext('webgl', { antialias: true, alpha: false }); } catch (e) {}
  if (!gl) { heroFallback(); return; }
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); heroFallback(); });

  function resizeHero() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resizeHero);
  resizeHero();

  const VS = `attribute vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }`;
  const FS = `
precision highp float;
uniform vec2  u_res;
uniform float u_t;
uniform float u_prox;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0,a=0.5;
  for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.1+vec2(1.7,9.2);a*=0.5;}
  return v;
}
float flicker(float t){
  return 0.78+0.09*sin(t*1.73+0.3)+0.06*sin(t*3.17+1.1)
            +0.04*sin(t*5.29+2.4)+0.02*sin(t*7.93+0.7)+0.01*sin(t*13.1+3.2);
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float asp = u_res.x / u_res.y;
  float p = u_prox;
  float t = u_t;
  float breath = 0.5 + 0.5*sin(t*1.1);
  float flick  = flicker(t);
  float horizBase = 0.30;
  float bump  = 0.018 * exp(-pow((uv.x-0.5)*asp*1.8,2.0)/0.12);
  float horizY = horizBase + bump;
  float aboveHoriz = step(horizY, uv.y);
  vec3 col = vec3(0.0);
  float starMask = smoothstep(horizY+0.06, horizY+0.22, uv.y) * (1.0-p*1.4);
  starMask = clamp(starMask, 0.0, 1.0);
  for(float s=0.0; s<4.0; s++){
    float scale = 180.0 + s*120.0;
    vec2 cell = floor(uv * vec2(scale, scale*0.65));
    float sh  = hash(cell + vec2(s*31.7, s*17.3));
    float hasStar = step(0.97, sh);
    vec2  cellUV = fract(uv * vec2(scale, scale*0.65));
    float dx2 = cellUV.x - 0.5, dy2 = cellUV.y - 0.5;
    float dd  = sqrt(dx2*dx2 + dy2*dy2);
    float br  = fract(sin(sh*311.7)*43758.5);
    float tw  = 0.5+0.5*sin(t*(0.3+sh*1.2)+sh*6.28);
    float dot = smoothstep(0.18, 0.0, dd) * hasStar * br * br * tw;
    col += vec3(0.95,0.90,0.75) * dot * starMask * 1.2;
  }
  if(aboveHoriz < 0.5){
    float tex = fbm(vec2(uv.x*5.0 + t*0.01, uv.y*12.0));
    col = mix(vec3(0.0), vec3(0.06,0.03,0.005), tex*0.5);
    float gx = (uv.x - 0.5)*asp;
    float gy = uv.y - horizY;
    float gd = sqrt(gx*gx + gy*gy*4.0);
    col += mix(vec3(0.25,0.12,0.0), vec3(0.6,0.32,0.02), p) * exp(-gd*gd/(0.01+p*0.08)) * (0.4+p*0.8);
  }
  float edgeDist = abs(uv.y - horizY);
  float horzFade = exp(-pow((uv.x-0.5)*asp,2.0)/(0.08+p*1.2));
  float rimGlow  = exp(-edgeDist/(0.006+p*0.025)) * horzFade;
  vec3  rimCol   = mix(vec3(0.6,0.32,0.02), vec3(1.0,0.78,0.18), p);
  col += rimCol * rimGlow * (0.5 + breath*0.1 + p*1.5) * (0.68+flick*0.32) * aboveHoriz;
  float lightY = horizBase + 0.018;
  float lightX = 0.5;
  float dx = (uv.x - lightX) * asp;
  float dy =  uv.y - lightY;
  float streakV = exp(-dy*dy/(0.0003 + p*0.002));
  float streakH = 1.0 / (1.0 + dx*dx * (2.5 - p*1.8));
  float streak  = streakV * streakH;
  vec3 streakCol = mix(
    mix(vec3(0.5,0.25,0.0), vec3(1.0,0.72,0.1), smoothstep(0.4,0.0,abs(dx))),
    vec3(1.0,0.95,0.65), smoothstep(0.15,0.0,abs(dx))
  );
  col += streakCol * streak * (0.4+breath*0.15+p*1.8) * (0.65+flick*0.35) * aboveHoriz;
  float rd = sqrt(dx*dx + dy*dy);
  float haze = exp(-rd*rd/(0.015+p*0.35)) * smoothstep(0.0,-0.05,dy-0.002);
  col += mix(vec3(0.4,0.2,0.0), vec3(0.85,0.48,0.03), p) * haze * (0.3+p*1.0) * aboveHoriz;
  float mglow = exp(-rd*rd/(0.004+p*0.06));
  col += mix(vec3(0.8,0.45,0.02), vec3(1.0,0.82,0.2), p) * mglow * (0.6+p*1.5) * aboveHoriz;
  float coreR = 0.006 + breath*0.002 + p*0.018;
  float core  = smoothstep(coreR*1.2, 0.0, rd);
  col += mix(vec3(1.0,0.9,0.4), vec3(1.0,0.98,0.9), p) * core * (2.5+p*3.0) * (0.8+flick*0.2);
  float refX = 2.0*lightX - uv.x;
  float refDist = length(vec2((uv.x-refX)*asp, uv.y-lightY));
  col += vec3(0.6,0.45,0.1) * exp(-refDist*refDist*400.0) * (0.12+p*0.25);
  vec2 vig = uv*(1.0-uv);
  col *= pow(vig.x*vig.y*15.0, 0.18);
  col += (hash(uv+fract(t*0.07))-0.5)*0.016;
  col = pow(clamp(col,0.0,1.0), vec3(0.88));
  gl_FragColor = vec4(col,1.0);
}`;

  function mkShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { heroFallback(); return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes  = gl.getUniformLocation(prog, 'u_res');
  const uT    = gl.getUniformLocation(prog, 'u_t');
  const uProx = gl.getUniformLocation(prog, 'u_prox');

  let hmx = innerWidth/2, hmy = innerHeight/2, smx = innerWidth/2, smy = innerHeight/2, sprox = 0;
  let ctaHovered = false;

  const ctaBtn = document.getElementById('hero-cta');
  ctaBtn.addEventListener('mouseenter', () => { ctaHovered = true; });
  ctaBtn.addEventListener('mouseleave', () => { ctaHovered = false; });
  ctaBtn.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById('s-stories');
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function cacheLogoRect() {
    const r = logo.getBoundingClientRect();
    lcx = r.left + r.width/2; lcy = r.top + r.height/2; lw = r.width; lh = r.height;
  }
  logo.addEventListener('load', () => setTimeout(cacheLogoRect, 200));
  window.addEventListener('resize', cacheLogoRect);
  setTimeout(cacheLogoRect, 500);

  const t0 = performance.now();
  let heroActive = true;

  const heroObs = new IntersectionObserver(entries => {
    heroActive = entries[0].isIntersecting;
  }, { threshold: 0.01 });
  heroObs.observe(document.getElementById('s-hero'));

  (function render() {
    if (heroDead) return;
    if (!REDUCED) requestAnimationFrame(render);
    if (!heroActive && !REDUCED) return;
    const t = (performance.now() - t0) / 1000;
    smx += (hmx - smx) * 0.05; smy += (hmy - smy) * 0.05;
    const ls = { x: canvas.offsetWidth * 0.5, y: canvas.offsetHeight * (1 - 0.318) };
    const dd = Math.sqrt((smx - ls.x)**2 + (smy - ls.y)**2);
    const raw = Math.max(0, 1 - dd / (Math.min(innerWidth, innerHeight) * 0.18));
    const targetProx = ctaHovered ? 1.0 : raw;
    sprox += (targetProx - sprox) * 0.05;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uT, t);
    gl.uniform1f(uProx, sprox);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!lcx) return;
    const ld = Math.sqrt((hmx - lcx)**2 + (hmy - lcy)**2);
    const lp = Math.max(0, 1 - ld / (Math.max(lw, lh) * 1.2));
    const combined = Math.max(lp, sprox * 0.45);
    const ia = 0.28 + Math.sin(t * 0.9) * 0.08;
    if (combined > 0.04) {
      logo.style.filter = `drop-shadow(0 0 ${15+combined*50}px rgba(255,215,50,${0.45+combined*0.55})) drop-shadow(0 0 ${40+combined*85}px rgba(200,130,5,${0.18+combined*0.36})) brightness(${1+combined*0.32})`;
      logo.style.transform = `scale(${1+combined*0.02})`;
    } else {
      logo.style.filter = `drop-shadow(0 0 20px rgba(200,130,5,${ia})) drop-shadow(0 0 50px rgba(150,85,3,${ia*0.4}))`;
      logo.style.transform = 'scale(1)';
    }
  })();

  document.addEventListener('mousemove', e => { hmx = e.clientX; hmy = e.clientY; });
})();
