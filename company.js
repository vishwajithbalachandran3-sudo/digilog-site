const toggle=document.querySelector('.nav-toggle');
const navigation=document.querySelector('#site-navigation');
toggle.addEventListener('click',()=>{const open=navigation.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
const form=document.querySelector('#contact-form');
const emailLink=document.querySelector('#email-submit');
function updateEmail(){const data=new FormData(form);const subject=encodeURIComponent(`Project inquiry${data.get('company')?` — ${data.get('company')}`:''}`);const body=encodeURIComponent(`Name: ${data.get('name')||''}\nCompany: ${data.get('company')||''}\nArea of interest: ${data.get('interest')||''}\n\nProject summary:\n${data.get('message')||''}`);emailLink.href=`mailto:digilogmicro@info.com?subject=${subject}&body=${body}`}
form.addEventListener('input',updateEmail);form.addEventListener('submit',event=>event.preventDefault());
