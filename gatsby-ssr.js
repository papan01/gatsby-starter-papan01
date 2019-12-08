const React = require('react');

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement('script', {
      dangerouslySetInnerHTML: {
        __html: `
          (() => {    
            window.__onThemeChange = function() {};                
            function setTheme(newTheme) {                  
              window.__theme = newTheme;                  
              preferredTheme = newTheme;                  
              document.body.className = newTheme;                 
              window.__onThemeChange(newTheme);                
            }

            let preferredTheme
            try {
              preferredTheme = localStorage.getItem('theme')
            } catch (err) {}

            window.__setPreferredTheme = newTheme => {
              setTheme(newTheme)
              try {
                localStorage.setItem('theme', newTheme)
              } catch (err) {}
            }

            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
            darkQuery.addListener(e => {
              window.__setPreferredTheme(e.matches ? 'light' : 'dark')
            })

            setTheme(preferredTheme || (darkQuery.matches ? 'light' : 'dark'))
          })()
        `,
      },
    }),
  ]);
};
