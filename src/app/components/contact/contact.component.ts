import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      const formData = this.contactForm.value;
      const lang = localStorage.getItem('language') || 'en';
      
      const payload = {
        "Nom du destinateur": formData.name,
        "Email du destinateur": formData.email,
        "Téléphone du destinateur": formData.phone,
        "Message": formData.message,
        "_subject": "Someone just submitted your form your portfolio",
        "_template": "table"
      };

      const submitUrl = 'https://formsubmit.co/ajax/ba90a3c7d804d7ca5b915486a09cdede';

      this.http.post(submitUrl, payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          
          let msg = lang === 'fr' 
            ? 'Message envoyé avec succès !' 
            : 'Message sent successfully!';
          
          this.showToast(msg, 'success');
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi:', error);
          this.isSubmitting = false;
          
          let msg = lang === 'fr' 
            ? 'Une erreur est survenue lors de l\'envoi.' 
            : 'An error occurred while sending.';
            
          this.showToast(msg, 'error');
        }
      });
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  private showToast(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
}
