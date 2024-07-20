export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Sessions = {
  _typename?: 'Sessions';
  id: Scalars['Float'];
  sessionId: Scalars['String'];
  sessionStatus: Scalars['String'];
  createdAt: Scalars['String'];
  creator: Scalars['String'];
  creatorAccount: Scalars['String'];
  creatorPicture: Scalars['String'];
  creatorName: Scalars['String'];
  creatorRegion: Scalars['String'];
  creatorCountry: Scalars['String'];
  creatorBrowser: Scalars['String'];
  creatorOS: Scalars['String'];
}

export type Admin = {
  __typename?: 'Admin';
  accountOfficer?: Maybe<SuperAdmin>;
  agreedTo: Scalars['Boolean'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  folder: Scalars['String'];
  id: Scalars['Float'];
  isBeginner: Scalars['Float'];
  isDisabled: Scalars['Boolean'];
  isPaid: Scalars['Boolean'];
  isReferred: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  plan?: Maybe<Scalars['String']>;
  profileImgUrl: Scalars['String'];
  referralCode?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  school: Scalars['String'];
  schoolImg: Scalars['String'];
  status: Scalars['String'];
  statusCode: Scalars['String'];
  userId: Scalars['String'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  admin?: Maybe<Admin>;
  errors?: Maybe<Array<FieldError>>;
};

export type Agent = {
  __typename?: 'Agent';
  agreedTo: Scalars['Boolean'];
  arctype: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  docType: Scalars['String'];
  document: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  folder: Scalars['String'];
  id: Scalars['Float'];
  isDisabled: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
  referralCode: Scalars['String'];
  refreeAddress: Scalars['String'];
  refreeName: Scalars['String'];
  refreePhoneNumber: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  status: Scalars['String'];
  userId: Scalars['String'];
};

export type AgentResponse = {
  __typename?: 'AgentResponse';
  agent?: Maybe<Agent>;
  errors?: Maybe<Array<FieldError>>;
};

export type AssessmentResponse = {
  __typename?: 'AssessmentResponse';
  assessment?: Maybe<Assessments>;
  errors?: Maybe<Array<FieldError>>;
};

export type Assessments = {
  __typename?: 'Assessments';
  approvedAt: Scalars['String'];
  createdAt: Scalars['String'];
  creator: Scalars['String'];
  currentTerm: Scalars['String'];
  id: Scalars['Float'];
  isOfficial: Scalars['Boolean'];
  school: School;
  scores?: Maybe<Array<Scalars['Int']>>;
  student: Student;
  subjects?: Maybe<Array<Scalars['String']>>;
  testType: Scalars['String'];
  updatedAt: Scalars['String'];
  wasEdited: Scalars['Boolean'];
};

export type Attendance = {
  __typename?: 'Attendance';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  isPresent: Scalars['Boolean'];
  note: Scalars['String'];
  student: Student;
  wasEdited: Scalars['Boolean'];
};

export type AttendanceResponse = {
  __typename?: 'AttendanceResponse';
  attendance?: Maybe<Attendance>;
  errors?: Maybe<Array<FieldError>>;
};

export type Bursar = {
  __typename?: 'Bursar';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  folder: Scalars['String'];
  id: Scalars['Float'];
  isDisabled: Scalars['Boolean'];
  isVisible?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  profileImgUrl: Scalars['String'];
  role: Scalars['String'];
  school: SchoolResponse;
  status: Scalars['String'];
  userId: Scalars['String'];
};

export type BursarResponse = {
  __typename?: 'BursarResponse';
  bursar?: Maybe<Bursar>;
  errors?: Maybe<Array<FieldError>>;
};

export type Classroom = {
  __typename?: 'Classroom';
  classId: Scalars['String'];
  className: Scalars['String'];
  classSubjects: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  isDisabled: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  students: Array<Student>;
  teacher: Array<Teacher>;
  updatedAt: Scalars['String'];
  wasEdited: Scalars['Boolean'];
};

export type ClassroomResponse = {
  __typename?: 'ClassroomResponse';
  classroom?: Maybe<Classroom>;
  errors?: Maybe<Array<FieldError>>;
};

export type Comments = {
  __typename?: 'Comments';
  body: Scalars['String'];
  contextId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: Scalars['String'];
  creatorName: Scalars['String'];
  creatorPicture: Scalars['String'];
  creatorRole: Scalars['String'];
  id: Scalars['Float'];
  parentCommentId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  wasEdited: Scalars['Boolean'];
};

export type Document = {
  __typename?: 'Document';
  approvedAt: Scalars['String'];
  createdAt: Scalars['String'];
  creator: Scalars['String'];
  document: Scalars['String'];
  documentId: Scalars['String'];
  fileType: Scalars['String'];
  folder: Scalars['String'];
  id: Scalars['Float'];
  isVerified: Scalars['Boolean'];
  note?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type DocumentResponse = {
  __typename?: 'DocumentResponse';
  document?: Maybe<Document>;
  errors?: Maybe<Array<FieldError>>;
};

export type Earnings = {
  __typename?: 'Earnings';
  amount: Scalars['Float'];
  client: Scalars['String'];
  clientType: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  package?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type EarningsResponse = {
  __typename?: 'EarningsResponse';
  earnings?: Maybe<Earnings>;
  errors?: Maybe<Array<FieldError>>;
};

export type EducationHistory = {
  __typename?: 'EducationHistory';
  classroom: Scalars['String'];
  createdAt: Scalars['String'];
  endDate: Scalars['String'];
  id: Scalars['Float'];
  school: Scalars['String'];
  schoolImg?: Maybe<Scalars['String']>;
  startDate: Scalars['String'];
  student: Scalars['Float'];
  transferedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GenerateResult = {
  __typename?: 'GenerateResult';
  academicTerm: Scalars['String'];
  adminRemark?: Maybe<Scalars['String']>;
  approvedAt: Scalars['String'];
  assessment: Scalars['String'];
  attendance?: Maybe<Scalars['Int']>;
  className?: Maybe<Scalars['String']>;
  classStudents?: Maybe<Scalars['Int']>;
  classTeacherName: Scalars['String'];
  classTermAverage: Scalars['Float'];
  createdAt: Scalars['String'];
  creator: Scalars['String'];
  creatorName: Scalars['String'];
  creatorPicture: Scalars['String'];
  creatorRole: Scalars['String'];
  grades?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Float'];
  isOfficial: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  remark?: Maybe<Scalars['String']>;
  resultTemplate: Scalars['Int']
  resultType: Scalars['String'];
  school: School;
  scores?: Maybe<Array<Scalars['Int']>>;
  signature1?: Maybe<Scalars['String']>;
  signature2?: Maybe<Scalars['String']>;
  student: Student;
  studentAge?: Maybe<Scalars['Int']>;
  studentName?: Maybe<Scalars['String']>;
  subjects?: Maybe<Array<Scalars['String']>>;
  test1?: Maybe<Array<Scalars['Int']>>;
  test2?: Maybe<Array<Scalars['Int']>>;
  test3?: Maybe<Array<Scalars['Int']>>;
  test4?: Maybe<Array<Scalars['Int']>>;
  testArray?: Maybe<Array<Scalars['Int']>>;
  updatedAt: Scalars['String'];
  verifiedBy: Scalars['String'];
  wasEdited: Scalars['Boolean'];
};

export type GenerateResultResponse = {
  __typename?: 'GenerateResultResponse';
  errors?: Maybe<Array<FieldError>>;
  generate?: Maybe<GenerateResult>;
};

export type GrayCase = {
  __typename?: 'GrayCase';
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: AdminResponse;
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  note: Scalars['String'];
  owingAmount: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  wasEdited: Scalars['Boolean'];
};

export type GrayCaseResponse = {
  __typename?: 'GrayCaseResponse';
  errors?: Maybe<Array<FieldError>>;
  grayCase?: Maybe<GrayCase>;
};

export type Group = {
  __typename?: 'Group';
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: Scalars['String'];
  creatorName: Scalars['String'];
  creatorProfilePicture: Scalars['String'];
  creatorRole: Scalars['String'];
  groupDescription: Scalars['String'];
  groupName: Scalars['String'];
  id: Scalars['Float'];
  isDisabled: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  members: Array<Scalars['String']>;
  membersName: Array<Scalars['String']>;
  membersProfilePicture: Array<Scalars['String']>;
  membersRole: Array<Scalars['String']>;
  profileImgUrl: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Invoice = {
  __typename?: 'Invoice';
  academicTerm: Scalars['String'];
  academicYear: Scalars['String'];
  amount: Scalars['Float'];
  balance: Scalars['Float'];
  category: Scalars['String'];
  createdAt: Scalars['String'];
  creator: Scalars['String'];
  creatorSchool: Scalars['String'];
  creatorSchoolImg: Scalars['String'];
  id: Scalars['Float'];
  invoiceId: Scalars['String'];
  isDisabled: Scalars['Boolean'];
  isRefundable: Scalars['Boolean'];
  receipt: Array<Receipt>;
  receiptCreator: Scalars['String'];
  receiptCreatorImg: Scalars['String'];
  receiptCreatorRole: Scalars['String'];
  response?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  student: Student;
  summary?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type InvoiceResponse = {
  __typename?: 'InvoiceResponse';
  errors?: Maybe<Array<FieldError>>;
  invoice?: Maybe<Invoice>;
};

export type Labels = {
  __typename?: 'Labels';
  color: Scalars['String'];
  id: Scalars['Float'];
  label: Scalars['String'];
  task: Task;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  errors?: Maybe<Array<FieldError>>;
  messages?: Maybe<Messages>;
};

export type Messages = {
  __typename?: 'Messages';
  createdAt: Scalars['DateTime'];
  hasReply: Scalars['Boolean'];
  id: Scalars['Float'];
  isVisible: Scalars['Boolean'];
  message: Scalars['String'];
  parentMessageId?: Maybe<Scalars['Float']>;
  receiver: Array<Scalars['String']>;
  receiverName: Array<Scalars['String']>;
  receiverProfilePicture: Array<Scalars['String']>;
  receiverRole: Array<Scalars['String']>;
  sender: Scalars['String'];
  senderName: Scalars['String'];
  senderProfilePicture: Scalars['String'];
  senderRole: Scalars['String'];
  status: Scalars['String'];
  subject: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  wasEdited: Scalars['Boolean'];
};

export type Notes = {
    __typename?: 'Notes';
    body: Scalars['String'];
    bodySnippet: Scalars['String'];
    category: Scalars['String'];
    createdAt: Scalars['DateTime'];
    creator: Scalars['String'];
    id: Scalars['Float'];
    isDisabled: Scalars['Boolean'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    wasEdited: Scalars['Boolean'];
  };
  
  export type NotesResponse = {
    __typename?: 'NotesResponse';
    errors?: Maybe<Array<FieldError>>;
    notes?: Maybe<Notes>;
  };
  
  export type Notifications = {
    __typename?: 'Notifications';
    action: Scalars['String'];
    createdAt: Scalars['DateTime'];
    id: Scalars['Float'];
    isSeen: Scalars['Boolean'];
    message: Scalars['String'];
    ref: Scalars['String'];
    userId: Array<Scalars['String']>;
  };

  export type Parent = {
    __typename?: 'Parent';
    agreedTo: Scalars['Boolean'];
    children: Array<Student>;
    createdAt: Scalars['String'];
    email: Scalars['String'];
    firstName: Scalars['String'];
    folder: Scalars['String'];
    id: Scalars['Float'];
    isDisabled: Scalars['Boolean'];
    isPaid: Scalars['Boolean'];
    isReferred: Scalars['Boolean'];
    isVerified: Scalars['Boolean'];
    lastName: Scalars['String'];
    middleName?: Maybe<Scalars['String']>;
    parentRole: Scalars['String'];
    phoneNumber: Scalars['String'];
    plan: Scalars['String'];
    profileImgUrl: Scalars['String'];
    role: Scalars['String'];
    status: Scalars['String'];
    subscriptionId: Scalars['String'];
    userId: Scalars['String'];
  };
  
  export type ParentResponse = {
    __typename?: 'ParentResponse';
    errors?: Maybe<Array<FieldError>>;
    parent?: Maybe<Parent>;
  };

  export type Receipt = {
    __typename?: 'Receipt';
    amountPaid: Scalars['Float'];
    createdAt: Scalars['String'];
    creator: Scalars['String'];
    fileType?: Maybe<Scalars['String']>;
    id: Scalars['Float'];
    parentInvoiceId: Scalars['String'];
    status: Scalars['String'];
    student: Student;
    summary?: Maybe<Scalars['String']>;
    updatedAt: Scalars['String'];
    uploadedDocument?: Maybe<Scalars['String']>;
  };
  
  export type ReceiptResponse = {
    __typename?: 'ReceiptResponse';
    errors?: Maybe<Array<FieldError>>;
    receipt?: Maybe<Receipt>;
  };
  
  export type Report = {
    __typename?: 'Report';
    body: Scalars['String'];
    category: Scalars['String'];
    createdAt: Scalars['DateTime'];
    creator: Scalars['String'];
    id: Scalars['Float'];
    isSeen: Scalars['Boolean'];
    parent: Scalars['String'];
    reportid: Scalars['String'];
    student: Scalars['String'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    wasEdited: Scalars['Boolean'];
  };
  
  export type ReportResponse = {
    __typename?: 'ReportResponse';
    errors?: Maybe<Array<FieldError>>;
    report?: Maybe<Report>;
  };
  
  export type Requests = {
    __typename?: 'Requests';
    accepted: Scalars['Boolean'];
    createdAt: Scalars['DateTime'];
    funcOfRequesting: Scalars['String'];
    id: Scalars['Float'];
    message: Scalars['String'];
    nameOfRequesting: Scalars['String'];
    picOfRequesting: Scalars['String'];
    purpose: Scalars['String'];
    requestingAdmin: Scalars['String'];
    roleOfRequesting: Scalars['String'];
    status: Scalars['String'];
    student: Student;
    updatedAt: Scalars['DateTime'];
  };
  
  export type RequestsResponse = {
    __typename?: 'RequestsResponse';
    errors?: Maybe<Array<FieldError>>;
    requests?: Maybe<Requests>;
  };
  
  export type Result = {
    __typename?: 'Result';
    approvedAt: Scalars['String'];
    createdAt: Scalars['String'];
    creator: Scalars['String'];
    creatorName: Scalars['String'];
    creatorPicture: Scalars['String'];
    creatorRole: Scalars['String'];
    document: Scalars['String'];
    fileType: Scalars['String'];
    folder: Scalars['String'];
    id: Scalars['Float'];
    isAcknowledged: Scalars['Boolean'];
    isOfficial: Scalars['Boolean'];
    remark?: Maybe<Scalars['String']>;
    resultType: Scalars['String'];
    school?: Maybe<School>;
    student: Student;
    studentName: Scalars['String'];
    updatedAt: Scalars['String'];
    verifiedBy: Scalars['String'];
    wasEdited: Scalars['Boolean'];
  };
  
  export type ResultResponse = {
    __typename?: 'ResultResponse';
    errors?: Maybe<Array<FieldError>>;
    result?: Maybe<Result>;
  };
  
  export type School = {
    __typename?: 'School';
    accountName?: Maybe<Array<Scalars['String']>>;
    accountNumber?: Maybe<Array<Scalars['String']>>;
    address: Scalars['String'];
    bankName?: Maybe<Array<Scalars['String']>>;
    bannerImgUrl: Scalars['String'];
    country: Scalars['String'];
    createdAt: Scalars['DateTime'];
    creator?: Maybe<AdminResponse>;
    currentSession:Scalars['String']
    description: Scalars['String'];
    email: Scalars['String'];
    facebookUrl: Scalars['String'];
    folder: Scalars['String'];
    genderType?: Maybe<Scalars['String']>;
    id: Scalars['Float'];
    instagramUrl: Scalars['String'];
    isDisabled: Scalars['Boolean'];
    isVerified: Scalars['Boolean'];
    lgarea: Scalars['String'];
    license?: Maybe<Scalars['String']>;
    linkedinUrl: Scalars['String'];
    logoImgUrl: Scalars['String'];
    phonenumber: Scalars['String'];
    priceRange?: Maybe<Scalars['String']>;
    profileLikes?: Maybe<Scalars['Float']>;
    profileViews?: Maybe<Scalars['Float']>;
    rcnumber?: Maybe<Scalars['String']>;
    schoolMedia?: Maybe<Array<Scalars['String']>>;
    schoolName: Scalars['String'];
    schoolType?: Maybe<Scalars['String']>;
    state: Scalars['String'];
    studentPerClassroom?: Maybe<Scalars['String']>;
    twitterUrl: Scalars['String'];
    type: Scalars['String'];
    websiteUrl: Scalars['String'];
    whoLikedProfile?: Maybe<Array<Scalars['String']>>;
  };
  
  export type SchoolResponse = {
    __typename?: 'SchoolResponse';
    errors?: Maybe<Array<FieldError>>;
    school?: Maybe<School>;
  };
  
  export type Student = {
    __typename?: 'Student';
    ageInput: Scalars['Float'];
    birthDate: Scalars['DateTime'];
    classroom: ClassroomResponse;
    createdAt: Scalars['String'];
    creator: AdminResponse;
    endDate: Scalars['String'];
    fatherEmail: Scalars['String'];
    fatherName: Scalars['String'];
    fatherNumber: Scalars['String'];
    firstName: Scalars['String'];
    folder: Scalars['String'];
    gender: Scalars['String'];
    grayId: Scalars['String'];
    homeAddress: Scalars['String'];
    id: Scalars['Float'];
    isArchived: Scalars['Boolean'];
    isDuplicate: Scalars['Boolean'];
    isLinked: Scalars['Boolean'];
    isOwing: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    lastName: Scalars['String'];
    lgaOrigin: Scalars['String'];
    linkCount: Scalars['Float'];
    linkedAt?: Maybe<Scalars['String']>;
    middleName: Scalars['String'];
    motherEmail: Scalars['String'];
    motherName: Scalars['String'];
    motherNumber: Scalars['String'];
    parent: Array<Parent>;
    profileImgUrl: Scalars['String'];
    school: SchoolResponse;
    startDate: Scalars['String'];
    state: Scalars['String'];
    studentCase: GrayCaseResponse;
    transferedAt: Scalars['String'];
    wallet?: Maybe<Scalars['Float']>;
  };
  
  export type StudentResponse = {
    __typename?: 'StudentResponse';
    errors?: Maybe<Array<FieldError>>;
    student?: Maybe<Student>;
  };
  
  export type SuperAdmin = {
    __typename?: 'SuperAdmin';
    createdAt: Scalars['String'];
    department: Scalars['String'];
    email: Scalars['String'];
    fullName: Scalars['String'];
    greyAdmin?: Maybe<Admin>;
    id: Scalars['Float'];
    isDirector: Scalars['Boolean'];
    isDisabled: Scalars['Boolean'];
    isSuper: Scalars['Boolean'];
    phoneNumber: Scalars['String'];
    profileImgUrl: Scalars['String'];
    role: Scalars['String'];
    status: Scalars['String'];
    userId: Scalars['String'];
    username: Scalars['String'];
  };
  
  export type SuperAdminResponse = {
    __typename?: 'SuperAdminResponse';
    errors?: Maybe<Array<FieldError>>;
    superAdmin?: Maybe<SuperAdmin>;
  };
  
  export type Task = {
    __typename?: 'Task';
    createdAt: Scalars['String'];
    creator: Admin;
    dueDateAt: Scalars['String'];
    id: Scalars['Float'];
    isArchived: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
    status: Scalars['String'];
    taskId: Scalars['String'];
    title: Scalars['String'];
    type: Scalars['String'];
    updatedAt: Scalars['String'];
  };
  
  export type TaskInput = {
    dueDateAt: Scalars['DateTime'];
    message: Scalars['String'];
    title: Scalars['String'];
    type: Scalars['String'];
  };
  
  export type Teacher = {
    __typename?: 'Teacher';
    classroom: ClassroomResponse;
    createdAt: Scalars['String'];
    email: Scalars['String'];
    firstName: Scalars['String'];
    folder: Scalars['String'];
    id: Scalars['Float'];
    isDisabled: Scalars['Boolean'];
    isVisible?: Maybe<Scalars['Boolean']>;
    lastName: Scalars['String'];
    middleName?: Maybe<Scalars['String']>;
    phoneNumber: Scalars['String'];
    profileImgUrl: Scalars['String'];
    role: Scalars['String'];
    school: SchoolResponse;
    status: Scalars['String'];
    userId: Scalars['String'];
  };
  
  export type TeacherResponse = {
    __typename?: 'TeacherResponse';
    errors?: Maybe<Array<FieldError>>;
    teacher?: Maybe<Teacher>;
  };
  
  export type Tickets = {
    __typename?: 'Tickets';
    acceptedAt: Scalars['DateTime'];
    assignedAt: Scalars['DateTime'];
    category: Scalars['String'];
    closedAt?: Maybe<Scalars['DateTime']>;
    createdAt: Scalars['DateTime'];
    creator: Scalars['String'];
    creatorName: Scalars['String'];
    creatorPicture: Scalars['String'];
    creatorRole: Scalars['String'];
    document: Scalars['String'];
    fileType?: Maybe<Scalars['String']>;
    id: Scalars['Float'];
    isAccepted: Scalars['Boolean'];
    isClosed: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
    ratings: Scalars['String'];
    reason: Scalars['String'];
    status: Scalars['String'];
    sudo?: Maybe<Scalars['String']>;
    ticketid: Scalars['String'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
  };
  
  export type UploadedResult = {
    __typename?: 'UploadedResult';
    approvedAt: Scalars['String'];
    createdAt: Scalars['String'];
    creator:Scalars['String'];
    creatorName:Scalars['String'];
    creatorPicture:Scalars['String'];
    creatorRole:Scalars['String'];
    document:Scalars['String'];
    fileType:Scalars['String'];
    folder:Scalars['String'];
    id:Scalars['String'];
    isAcknowledged:Scalars['String'];
    isOfficial:Scalars['Boolean'];
    remark:Scalars['String'];
    resultType:Scalars['String'];
    school: SchoolResponse
    student: StudentResponse
    studentName:Scalars['String'];
    updatedAt:Scalars['String'];
    verifiedBy:Scalars['String'];
    wasEdited:Scalars['Boolean'];
  }