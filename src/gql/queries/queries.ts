import { gql } from "@apollo/client";
export const GET_PARENT = gql(`
query Parent {
  parent {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      role
      folder
      isDisabled
      profileImgUrl
      children {
        id
        createdAt
        transferedAt
        firstName
        middleName
        lastName
        gender
        ageInput
        folder
        isOwing
        isVisible
        isDuplicate
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
            description
            isDisabled
            students {
              id
              createdAt
              transferedAt
              firstName
              middleName
              lastName
              gender
              ageInput
              folder
              isOwing
              isVisible
              isDuplicate
              linkedAt
              linkCount
              isLinked
              startDate
              endDate
              birthDate
              isArchived
              profileImgUrl
              grayId
              fatherName
              fatherEmail
              fatherNumber
              motherName
              motherEmail
              motherNumber
              homeAddress
              lgaOrigin
              state
            }
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
            }
          }
        }
        school {
          school {
            id
            createdAt
            isDisabled
            isVerified
            schoolName
            rcnumber
            address
            type
            lgarea
            folder
            state
            country
            description
            phonenumber
            email
            websiteUrl
            instagramUrl
            facebookUrl
            twitterUrl
            linkedinUrl
            logoImgUrl
            bannerImgUrl
            license
          }
        }
        creator {
          admin {
            id
            isPaid
            userId
            folder
            status
            plan
            isReferred
            isDisabled
            agreedTo
            referralCode
            createdAt
            firstName
            middleName
            lastName
            phoneNumber
            email
            profileImgUrl
            role
            school
            schoolImg
            statusCode
          }
        }
        studentCase {
          grayCase {
            id
            createdAt
            updatedAt
            category
            owingAmount
            note
            isActive
            wasEdited
          }
        }
        grayId
        fatherName
        fatherEmail
        fatherNumber
        motherName
        motherEmail
        motherNumber
        homeAddress
        lgaOrigin
        state
      }
    }
  }
}
`);

export const ACCEPT_INVOICE = gql(`
mutation AcceptInvoice($document: String!, $fileType: String!, $amountPaid: Float!, $invoiceid: Float!, $summary: String) {
  acceptInvoice(document: $document, fileType: $fileType, amountPaid: $amountPaid, invoiceid: $invoiceid, summary: $summary) {
    errors {
      field
      message
    }
    receipt {
      id
      createdAt
      updatedAt
      parentInvoiceId
      summary
      status
      amountPaid
      uploadedDocument
      fileType
      creator
      student {
        id
        createdAt
        transferedAt
        firstName
        middleName
        lastName
        gender
        ageInput
        folder
        isOwing
        isVisible
        isDuplicate
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
            description
            isDisabled
            students {
              id
              createdAt
              transferedAt
              firstName
              middleName
              lastName
              gender
              ageInput
              folder
              isOwing
              isVisible
              isDuplicate
              linkedAt
              linkCount
              isLinked
              startDate
              endDate
              birthDate
              isArchived
              profileImgUrl
              grayId
              fatherName
              fatherEmail
              fatherNumber
              motherName
              motherEmail
              motherNumber
              homeAddress
              lgaOrigin
              state
            }
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
            }
          }
        }
        school {
          school {
            id
            createdAt
            isDisabled
            isVerified
            schoolName
            rcnumber
            address
            type
            lgarea
            folder
            state
            country
            description
            phonenumber
            email
            websiteUrl
            instagramUrl
            facebookUrl
            twitterUrl
            linkedinUrl
            logoImgUrl
            bannerImgUrl
            license
          }
        }
        creator {
          admin {
            id
            isPaid
            userId
            folder
            status
            plan
            isReferred
            isDisabled
            agreedTo
            referralCode
            createdAt
            firstName
            middleName
            lastName
            phoneNumber
            email
            profileImgUrl
            role
            school
            schoolImg
            statusCode
          }
        }
        studentCase {
          grayCase {
            id
            createdAt
            updatedAt
            category
            owingAmount
            note
            isActive
            wasEdited
          }
        }
        grayId
        fatherName
        fatherEmail
        fatherNumber
        motherName
        motherEmail
        motherNumber
        homeAddress
        lgaOrigin
        state
      }
    }
  }
}
`)

export const REJECT_INVOICE = gql(`
mutation RejectInvoice($response: String!, $invoiceid: Float!) {
  rejectInvoice(response: $response, invoiceid: $invoiceid)
}`)

export const GET_STUDENT_ATTENDANCE = gql(`
query FetchStudentAttendance($studentId: Float!) {
  fetchStudentAttendance(studentId: $studentId) {
    id
    createdAt
    isPresent
    wasEdited
    note
    student {
      id
      createdAt
      transferedAt
      firstName
      middleName
      lastName
      gender
      ageInput
      folder
      isOwing
      isVisible
      isDuplicate
      linkedAt
      linkCount
      isLinked
      startDate
      endDate
      birthDate
      isArchived
      profileImgUrl
      classroom {
        errors {
          field
          message
        }
        classroom {
          id
          isValid
          wasEdited
          createdAt
          updatedAt
          classId
          className
          classSubjects
          description
          isDisabled
          students {
            id
            createdAt
            transferedAt
            firstName
            middleName
            lastName
            gender
            ageInput
            folder
            isOwing
            isVisible
            isDuplicate
            linkedAt
            linkCount
            isLinked
            startDate
            endDate
            birthDate
            isArchived
            profileImgUrl
            grayId
            fatherName
            fatherEmail
            fatherNumber
            motherName
            motherEmail
            motherNumber
            homeAddress
            lgaOrigin
            state
          }
          teacher {
            id
            userId
            createdAt
            status
            firstName
            middleName
            lastName
            phoneNumber
            email
            role
            folder
            isDisabled
            isVisible
            profileImgUrl
          }
        }
      }
      school {
        school {
          id
          createdAt
          isDisabled
          isVerified
          schoolName
          rcnumber
          address
          type
          lgarea
          folder
          state
          country
          description
          phonenumber
          email
          websiteUrl
          instagramUrl
          facebookUrl
          twitterUrl
          linkedinUrl
          logoImgUrl
          bannerImgUrl
          license
        }
      }
      creator {
        admin {
          id
          isPaid
          userId
          folder
          status
          plan
          isReferred
          isDisabled
          agreedTo
          referralCode
          createdAt
          firstName
          middleName
          lastName
          phoneNumber
          email
          profileImgUrl
          role
          school
          schoolImg
          statusCode
        }
      }
      studentCase {
        grayCase {
          id
          createdAt
          updatedAt
          category
          owingAmount
          note
          isActive
          wasEdited
        }
      }
      grayId
      fatherName
      fatherEmail
      fatherNumber
      motherName
      motherEmail
      motherNumber
      homeAddress
      lgaOrigin
      state
    }
  }
}`)

export const GET_STUDENT_INVOICE = gql(`
query GetStudentInvoice($studentId: Float!) {
  getStudentInvoice(studentId: $studentId) {
    id
    createdAt
    updatedAt
    invoiceId
    summary
    response
    status
    amount
    balance
    isDisabled
    category
    academicTerm
    academicYear
    creator
    student {
      id
      createdAt
      transferedAt
      firstName
      middleName
      lastName
      gender
      ageInput
      folder
      isOwing
      isVisible
      isDuplicate
      linkedAt
      linkCount
      isLinked
      startDate
      endDate
      birthDate
      isArchived
      profileImgUrl
      classroom {
        errors {
          field
          message
        }
        classroom {
          id
          isValid
          wasEdited
          createdAt
          updatedAt
          classId
          className
          classSubjects
          description
          isDisabled
          students {
            id
            createdAt
            transferedAt
            firstName
            middleName
            lastName
            gender
            ageInput
            folder
            isOwing
            isVisible
            isDuplicate
            linkedAt
            linkCount
            isLinked
            startDate
            endDate
            birthDate
            isArchived
            profileImgUrl
            grayId
            fatherName
            fatherEmail
            fatherNumber
            motherName
            motherEmail
            motherNumber
            homeAddress
            lgaOrigin
            state
          }
          teacher {
            id
            userId
            createdAt
            status
            firstName
            middleName
            lastName
            phoneNumber
            email
            role
            folder
            isDisabled
            isVisible
            profileImgUrl
          }
        }
      }
      school {
        school {
          id
          createdAt
          isDisabled
          isVerified
          schoolName
          rcnumber
          address
          type
          lgarea
          folder
          state
          country
          description
          phonenumber
          email
          websiteUrl
          instagramUrl
          facebookUrl
          twitterUrl
          linkedinUrl
          logoImgUrl
          bannerImgUrl
          license
        }
      }
      creator {
        admin {
          id
          isPaid
          userId
          folder
          status
          plan
          isReferred
          isDisabled
          agreedTo
          referralCode
          createdAt
          firstName
          middleName
          lastName
          phoneNumber
          email
          profileImgUrl
          role
          school
          schoolImg
          statusCode
        }
      }
      studentCase {
        grayCase {
          id
          createdAt
          updatedAt
          category
          owingAmount
          note
          isActive
          wasEdited
        }
      }
      grayId
      fatherName
      fatherEmail
      fatherNumber
      motherName
      motherEmail
      motherNumber
      homeAddress
      lgaOrigin
      state
    }
    receipt {
      id
      createdAt
      updatedAt
      parentInvoiceId
      summary
      status
      amountPaid
      uploadedDocument
      fileType
      creator
    }
  }
}`)

export const GET_SCHOOLS = gql(`
query GetSchools {
  getSchools {
    id
    createdAt
    isDisabled
    isVerified
    schoolName
    rcnumber
    address
    type
    lgarea
    folder
    state
    country
    description
    phonenumber
    email
    websiteUrl
    instagramUrl
    facebookUrl
    twitterUrl
    linkedinUrl
    logoImgUrl
    bannerImgUrl
    license
    creator {
      errors {
        field
        message
      }
      admin {
        id
        isPaid
        userId
        folder
        status
        plan
        isReferred
        isDisabled
        agreedTo
        referralCode
        createdAt
        firstName
        middleName
        lastName
        phoneNumber
        email
        profileImgUrl
        role
        school
        schoolImg
        statusCode
      }
    }
  }
}`)

export const UPLOAD_RESULT = gql(`
mutation UploadResult($studentId: Float!, $resultType: String!, $fileType: String!, $folder: String!, $document: String!, $schoolId: Float, $remark: String) {
  uploadResult(studentId: $studentId, resultType: $resultType, fileType: $fileType, folder: $folder, document: $document, schoolId: $schoolId, remark: $remark) {
    errors {
      field
      message
    }
    result {
      id
      isOfficial
      wasEdited
      createdAt
      approvedAt
      updatedAt
      remark
      fileType
      resultType
      document
      folder
      verifiedBy
      studentName
      isAcknowledged
      creator
      creatorRole
      creatorPicture
      creatorName
    }
  }
}`)