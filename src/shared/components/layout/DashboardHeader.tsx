import React from 'react';
import styled from 'styled-components';
import { tokens } from '../../../styles/tokens';
import { MenuIcon } from '../../../assets/icons/CommonIcons';
import iconAlarm from '../../../assets/images/icons/icon_alarm.png';
import iconSearch from '../../../assets/images/icons/icon_search.png';
import iconMenu from '../../../assets/images/icons/icon_menu.png';
import { useAuth } from '../../../features/auth/AuthContext';
// import { useUserStore } from '../../../stores/userStore'; // Removed - using AuthContext
import * as Typography from '../ui/Typography';
import { smoothTransition } from '../../../styles/animations';
import { 
  universalHeader,
  responsiveTypography,
  responsiveSizes,
  responsiveSpacing,
  breakpoints
} from '../../../styles/universal-responsive';
const HeaderContainer = styled.header`
  ${universalHeader}
  background-color: ${tokens.colors.background.primary};
  border-bottom: 1px solid ${tokens.colors.border.light};
  box-shadow: ${tokens.shadows.elevation1};
  
  /* Exact height matching reference screenshot */
  height: 56px;
  min-height: 56px;
  
  /* Precise padding to match reference proportions */
  padding: 0 16px;
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  /* Tighter gap to match reference screenshot */
  gap: 12px;
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
  /* Precise spacing between icons */
  gap: 8px;
`;
const FamilyLogo = styled.div`
  /* Exact size matching reference screenshot */
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, ${tokens.colors.success.base} 0%, ${tokens.colors.success.dark} 100%);
  border-radius: ${tokens.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.background.primary};
  font-weight: ${tokens.typography.fontWeight.bold};
  /* Precise font size for avatar text */
  font-size: 16px;
  line-height: 1;
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* Minimal gap between text lines to match reference */
  gap: 2px;
`;
const UserName = styled.div`
  /* Exact font size matching reference screenshot */
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  color: ${tokens.colors.text.primary};
`;
const UserTitle = styled.div`
  /* Exact font size matching reference screenshot */
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  color: ${tokens.colors.text.secondary};
`;
const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  /* Optimized touch target size matching reference */
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.borderRadius.round};
  ${smoothTransition};
  position: relative;
  
  /* Ensure minimum touch target for accessibility */
  min-width: 40px;
  min-height: 40px;
  
  &:hover {
    background-color: ${tokens.colors.action.hover};
  }
  &:active {
    background-color: ${tokens.colors.action.pressed};
  }
`;

const IconImage = styled.img`
  /* Exact icon size matching reference screenshot */
  width: 20px;
  height: 20px;
  object-fit: contain;
`;
interface DashboardHeaderProps {
  onMenuClick?: () => void;
  onAlarmClick?: () => void;
  onSearchClick?: () => void;
  userName?: string;
}
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, onAlarmClick, onSearchClick, userName: propUserName }) => {
  const { user: authUser } = useAuth();
  // AuthContext의 User를 우선 사용 (name 속성이 있음)
  let userName = '사용자';
  if (propUserName) {
    userName = propUserName;
  } else if (authUser?.name) {
    userName = authUser.name;
  } else if (authUser?.email) {
    userName = authUser.email.split('@')[0];
  }
  return (
    <HeaderContainer>
      <LeftSection>
        <FamilyLogo>F</FamilyLogo>
        <UserInfo>
          <UserName>{userName}님</UserName>
          <UserTitle>대민님</UserTitle>
        </UserInfo>
      </LeftSection>
      <RightSection>
        <IconButton 
          aria-label="알림" 
          onClick={onAlarmClick}
        >
          <IconImage src={iconAlarm} alt="알림" />
        </IconButton>
        <IconButton 
          aria-label="전체메뉴" 
          onClick={onMenuClick}
        >
          <IconImage src={iconMenu} alt="메뉴" />
        </IconButton>
      </RightSection>
    </HeaderContainer>
  );
};