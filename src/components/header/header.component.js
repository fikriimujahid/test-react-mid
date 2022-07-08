import { HeaderContainer, LogoContainer, OptionImage, OptionLink, OptionsContainer } from "./header.style";
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/schedule'><OptionImage src='/Images/schedule.png' alt='item' /> Schedule</OptionLink>
        <OptionLink to='/leaderboard'><OptionImage src='/Images/leaderboard.png' alt='item' /> Leaderboard</OptionLink>
      </OptionsContainer>
    </HeaderContainer>
  )
}

export default Header;