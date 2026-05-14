(function () {

    const params   = new URLSearchParams(window.location.search);
    const modele   = params.get('modele')    || '';
    const prixStr  = params.get('prix')      || '';
    const categ    = params.get('categorie') || '';
    const prixJour = parseInt(prixStr.replace(/\D/g, ''), 10) || 0;

    if (modele) {
        document.getElementById('nom-modele').textContent = modele;
        document.getElementById('sous-titre').textContent =
            prixStr + ' — Remplissez le formulaire pour confirmer votre réservation.';
        document.title = 'Réservation — ' + modele;
    }

    if (categ) {
        const sel = document.getElementById('car-category');
        for (const opt of sel.options) {
            if (opt.value === categ) { opt.selected = true; break; }
        }
    }

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('pickup-date').min = today;
    document.getElementById('return-date').min = today;

    document.getElementById('pickup-date').addEventListener('change', function () {
        document.getElementById('return-date').min = this.value;
        const retour = document.getElementById('return-date');
        if (retour.value && retour.value < this.value) retour.value = '';
        calculerRecap();
    });

    function calculerRecap() {
        const dep       = document.getElementById('pickup-date').value;
        const ret       = document.getElementById('return-date').value;
        const assurance = document.getElementById('opt-assurance').checked;
        const chauffeur = document.getElementById('opt-chauffeur').checked;
        const recap     = document.getElementById('recap');

        if (!dep || !ret || !prixJour) {
            recap.classList.remove('visible');
            return;
        }

        const jours       = Math.max(1, Math.round((new Date(ret) - new Date(dep)) / 86400000));
        const baseTotal   = prixJour * jours;
        const assurTotal  = assurance ? 700  * jours : 0;
        const chauffTotal = chauffeur ? 3000 * jours : 0;
        const total       = baseTotal + assurTotal + chauffTotal;

        document.getElementById('recap-label').textContent =
            'Location (' + jours + ' jour' + (jours > 1 ? 's' : '') + ')';
        document.getElementById('recap-base').textContent =
            baseTotal.toLocaleString('fr-DZ') + ' DA';

        const assLigne = document.getElementById('recap-assurance-ligne');
        assLigne.style.display = assurance ? 'flex' : 'none';
        document.getElementById('recap-assurance').textContent =
            assurTotal.toLocaleString('fr-DZ') + ' DA';

        const chaLigne = document.getElementById('recap-chauffeur-ligne');
        chaLigne.style.display = chauffeur ? 'flex' : 'none';
        document.getElementById('recap-chauffeur').textContent =
            chauffTotal.toLocaleString('fr-DZ') + ' DA';

        document.getElementById('recap-total').textContent =
            total.toLocaleString('fr-DZ') + ' DA';

        recap.classList.add('visible');
    }

    /* ── Écouteurs d'événements ── */
    document.getElementById('return-date').addEventListener('change', calculerRecap);
    document.getElementById('opt-assurance').addEventListener('change', calculerRecap);
    document.getElementById('opt-chauffeur').addEventListener('change', calculerRecap);

    document.getElementById('form-reservation').addEventListener('submit', function (e) {
        e.preventDefault();

        const champs = ['location', 'pickup-date', 'pickup-time', 'return-date', 'return-time'];
        let valide = true;

        champs.forEach(function (id) {
            const el = document.getElementById(id);
            if (!el.value.trim()) {
                el.style.borderColor = '#e74c3c';
                valide = false;
                el.addEventListener('input', function () {
                    el.style.borderColor = '';
                }, { once: true });
            }
        });

        const dep = document.getElementById('pickup-date').value;
        const ret = document.getElementById('return-date').value;
        if (dep && ret && new Date(ret) < new Date(dep)) {
            document.getElementById('return-date').style.borderColor = '#e74c3c';
            valide = false;
        }

        if (!valide) return;

        const btn = document.querySelector('.submit-btn');
        btn.textContent = '✓ Envoyé';
        btn.disabled    = true;
        btn.style.background = '#27ae60';
        btn.style.color      = '#fff';

        const msg = document.getElementById('msg-succes');
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

})();