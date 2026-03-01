export function ThemeInitScript() {
  const script = `(function(){try{var t=localStorage.getItem('seismic-color-theme');if(t&&['teal','mango','tomato'].includes(t)){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','teal')}}catch(e){document.documentElement.setAttribute('data-theme','teal')}})()`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
