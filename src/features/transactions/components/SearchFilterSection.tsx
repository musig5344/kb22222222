import React from 'react';
import styled from 'styled-components';
import { FilterState } from './TransactionFilterModal';

// mainstart.jpg에 정확히 매칭하는 스타일링
const SearchContainer = styled.div`
  background: #f8f9fa;
  padding: 16px 24px;
  border-bottom: 1px solid #ebeef0;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SearchLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const SearchIcon = styled.div`
  font-size: 20px;
  color: #666666;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #333333;
  cursor: pointer;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #000000;
  }
`;

const DropdownArrow = styled.span`
  font-size: 14px;
  color: #666666;
`;

const ToggleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: #666666;
  letter-spacing: -0.2px;
`;

const ToggleSwitch = styled.div<{ $enabled: boolean }>`
  width: 44px;
  height: 24px;
  background-color: ${props => props.$enabled ? '#34C759' : '#E0E0E0'};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid ${props => props.$enabled ? '#34C759' : '#CCCCCC'};

  &::after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: ${props => props.$enabled ? '21px' : '1px'};
    transition: left 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

const DateRangeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateRange = styled.div`
  font-size: 14px;
  color: #666666;
  letter-spacing: -0.2px;
`;

interface SearchFilterSectionProps {
  dateRange: string;
  showBalance: boolean;
  appliedFilters: FilterState;
  onToggleBalance: () => void;
  onFilterClick: () => void;
  getSearchPlaceholder: () => string;
}

/**
 * 검색/필터 섹션 컴포넌트 (mainstart.jpg 정확한 매칭)
 * - 🔍 + "3개월 ▪ 전체 ▪ 최신순 ▼"
 * - 우측 "잔액표기" 토글 스위치
 * - 날짜 범위 표시
 */
const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  dateRange,
  showBalance,
  appliedFilters,
  onToggleBalance,
  onFilterClick,
  getSearchPlaceholder,
}) => {
  return (
    <SearchContainer>
      <SearchRow>
        <SearchLeft>
          <SearchIcon>🔍</SearchIcon>
          <FilterButton onClick={onFilterClick}>
            <span>{getSearchPlaceholder()}</span>
            <DropdownArrow>▼</DropdownArrow>
          </FilterButton>
        </SearchLeft>
        <ToggleSection>
          <ToggleLabel>잔액표기</ToggleLabel>
          <ToggleSwitch 
            $enabled={showBalance}
            onClick={onToggleBalance}
          />
        </ToggleSection>
      </SearchRow>
      <DateRangeRow>
        <DateRange>{dateRange}</DateRange>
      </DateRangeRow>
    </SearchContainer>
  );
};

export default SearchFilterSection;