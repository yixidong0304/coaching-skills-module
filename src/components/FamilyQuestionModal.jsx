import Modal from './Modal'
import { QUESTION_BANK, getFamilyMeta } from '../data/questionBank'

/**
 * Light modal with a family's full question bank.
 * Used by p2b-3 family cards.
 */
export default function FamilyQuestionModal({
  familyName,
  open,
  onClose,
  returnFocusRef,
}) {
  const bank = familyName ? (QUESTION_BANK[familyName] ?? []) : []
  const meta = familyName ? getFamilyMeta(familyName) : null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={familyName}
      returnFocusRef={returnFocusRef}
      closeLabel="Close question library"
      className="modal-panel--library"
    >
      {familyName ? (
        <>
          {meta?.modalLead ? (
            <p className="question-bank-lead m-0">{meta.modalLead}</p>
          ) : null}

          <ul className="question-bank-list">
            {bank.map((stem) => (
              <li key={stem}>{stem}</li>
            ))}
          </ul>
        </>
      ) : null}
    </Modal>
  )
}
