import logo from '../assets/brand-logo.png'
const Navbar = () => {
  const img1 = document.querySelectorAll('.meal-thumbnail img')
  img1.forEach(img => {
    img.src = logo
  })
  const img = document.querySelector('#logo')
  img.src = logo
}

export default Navbar