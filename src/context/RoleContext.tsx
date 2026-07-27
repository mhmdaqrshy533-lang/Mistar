import React, { createContext, useContext, useState, useEffect } from 'react';
import { EducationRole, EducationRoleID, EDUCATION_ROLES } from '../types/roles';

export interface NationalHeaderInfo {
  republic: string;
  ministry: string;
  office: string;
  directorate: string;
  schoolName: string;
  academicYear: string;
  term: string;
  officialTitleName: string;
  authorName: string;
  logoType: 'yemen_republic' | 'custom' | 'none';
  customLogoUrl?: string;
  showSeal: boolean;
  showQR: boolean;
  developerCredit: string;
}

interface RoleContextType {
  currentRole: EducationRole;
  setRole: (roleId: EducationRoleID) => void;
  headerInfo: NationalHeaderInfo;
  updateHeaderInfo: (info: Partial<NationalHeaderInfo>) => void;
  allRoles: EducationRole[];
}

const defaultHeaderInfo: NationalHeaderInfo = {
  republic: 'الجمهورية اليمنية',
  ministry: 'وزارة التربية والتعليم',
  office: 'مكتب التربية والتعليم أمانة العاصمة',
  directorate: 'إدارة التربية والتعليم بالمديرية',
  schoolName: 'مدرسة الرقيم النموذجية الثانوية',
  academicYear: '2024/2025م',
  term: 'الفصل الدراسي الأول',
  officialTitleName: 'مكتب أستاذ المادة',
  authorName: 'أ/ محمد الهزبري',
  logoType: 'yemen_republic',
  showSeal: true,
  showQR: true,
  developerCredit: 'الرقيم - المنصة الوطنية للوثائق التعليمية | برمجة وتطوير المهندس//:سهيل الهزبري'
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoleId, setCurrentRoleId] = useState<EducationRoleID>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('raq_active_role');
      if (saved && EDUCATION_ROLES[saved as EducationRoleID]) {
        return saved as EducationRoleID;
      }
    }
    return 'teacher';
  });

  const [headerInfo, setHeaderInfo] = useState<NationalHeaderInfo>(() => {
    if (typeof window !== 'undefined') {
      const savedHeader = localStorage.getItem('raq_header_info');
      if (savedHeader) {
        try {
          return { ...defaultHeaderInfo, ...JSON.parse(savedHeader) };
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultHeaderInfo;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('raq_active_role', currentRoleId);
    }
  }, [currentRoleId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('raq_header_info', JSON.stringify(headerInfo));
    }
  }, [headerInfo]);

  const setRole = (roleId: EducationRoleID) => {
    if (EDUCATION_ROLES[roleId]) {
      setCurrentRoleId(roleId);
      // Automatically update official header title based on role
      setHeaderInfo(prev => ({
        ...prev,
        officialTitleName: EDUCATION_ROLES[roleId].officialTitle
      }));
    }
  };

  const updateHeaderInfo = (info: Partial<NationalHeaderInfo>) => {
    setHeaderInfo(prev => ({ ...prev, ...info }));
  };

  const currentRole = EDUCATION_ROLES[currentRoleId] || EDUCATION_ROLES.teacher;
  const allRoles = Object.values(EDUCATION_ROLES);

  return (
    <RoleContext.Provider value={{ currentRole, setRole, headerInfo, updateHeaderInfo, allRoles }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
