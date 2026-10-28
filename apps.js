document.addEventListener('DOMContentLoaded', () => {
    const escrowForm = document.querySelector('#start form');
    
    if (escrowForm) {
        escrowForm.removeAttribute('onsubmit'); // Remove the inline placeholder
        
        escrowForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            // Gather input fields from the UI
            const roleSelect = escrowForm.querySelector('select:nth-of-type(1)');
            const categorySelect = escrowForm.querySelector('select:nth-of-type(2)');
            const valueInput = escrowForm.querySelector('input[type="number"]');
            const submitBtn = escrowForm.querySelector('button[type="submit"]');
            
            const tradeData = {
                role: roleSelect ? roleSelect.value : 'Unknown',
                category: categorySelect ? categorySelect.value : 'Unknown',
                itemValueZAR: valueInput ? parseFloat(valueInput.value) : 0,
                timestamp: new Date().toISOString()
            };
            
            // Basic Form Validation
            if (!tradeData.itemValueZAR || tradeData.itemValueZAR <= 0) {
                alert('Please enter a valid item value in ZAR to calculate escrow safety fees.');
                return;
            }
            
            // Visual feedback loop during processing
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Generating Manifest...';
            
            try {
                // Calculate standard 5% escrow fee framework structure
                const escrowFee = (tradeData.itemValueZAR * 0.05).toFixed(2);
                
                // Placeholder for secure webhook or API integration
                console.log('Secure Trade Manifest Data Compiled:', tradeData);
                
                // Display structural success notice directly to the user
                alert(`Success!\n\nTrade Manifest Generated Successfully.\nEstimated Escrow Safety Fee: R${escrowFee}\n\nNext Step: Secure database integration pending.`);
                
                escrowForm.reset();
            } catch (error) {
                console.error('System error processing transaction manifest:', error);
                alert('An error occurred while establishing your secure escrow profile. Please retry.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
