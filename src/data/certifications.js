import az900 from '../assets/mscert-az900.png'
import pythonCert from '../assets/python-cert.png'

const CERTIFICATIONS = [
  {
    id: 1,
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'April 17, 2026',
    verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/AndrewStam-6229/81161184FF0C249?sharingId=9A43886049085882',
    image: az900,
  },
  {
    id: 2,
    name: 'PCEP™ – Certified Entry-Level Python Programmer',
    issuer: 'Python Institute',
    date: 'October 16, 2023',
    verifyUrl: 'https://verify.openedg.org/?id=keYp.kZeK.g9WM',
    image: pythonCert,
  },
]

export default CERTIFICATIONS
