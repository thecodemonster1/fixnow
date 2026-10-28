// Agency credit at the very bottom of the public footer: a followed, brand-anchored link,
// with UTM tags so visits from this site show up in Z Tech Lanka's analytics.
const href = 'https://ztechlanka.com?utm_source=fixnow&utm_medium=footer_credit&utm_campaign=client_backlinks';

export function ZTechCredit() {
  return (
    <div className="credit">
      <p className="wrap">
        Built by <span aria-hidden>🧑‍💻</span>{' '}
        <a href={href} target="_blank" rel="noopener" title="Z Tech Lanka - Next-Level Tech for Gen Z">Z Tech Lanka</a>{' '}
        with <span role="img" aria-label="love">💛</span>
      </p>
    </div>
  );
}
