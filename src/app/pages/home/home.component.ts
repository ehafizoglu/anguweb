import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="about-container">
      <div class="profile-section">
        <div class="profile-image">
          <img src="assets/images/profile.jpg" alt="Engin Hafızoğlu" />
        </div>
      </div>
      
      <div class="content-section">
        <h2>Hakkımda / About Me</h2>
        
        <p>
          <a href="https://rxresu.me/enginhafizoglu/engin-hafizoglu-public" target="_blank" class="resume-link">
            Güncel özgeçmişime buradan ulaşabilirsiniz. / You can find my current resume here.
            <span class="arrow">→</span>
          </a>
        </p>

        <h3>Uzmanlık alanlarım / My specialities are:</h3>
        <ul class="specialties">
  <li><span class="specialty-item">Project Management</span></li>
  <li><span class="specialty-item">Information Technology</span></li>
  <li><span class="specialty-item">Digital Transformation</span></li>
  <li><span class="specialty-item">Agile Methodologies</span></li>
  <li><span class="specialty-item">Infrastructure</span></li>
  <li><span class="specialty-item">Customer Success</span></li>
  <li><span class="specialty-item">Analyzing Business Requirements</span></li>
  <li><span class="specialty-item">Enterprise Solutions</span></li>
  <li><span class="specialty-item">Enterprise Resource Planning</span></li>
  <li><span class="specialty-item">Oracle E-Business Suite / Supply Chain Management</span></li>
  <li><span class="specialty-item">Oracle E-Business Suite / Manufacturing</span></li>
  <li><span class="specialty-item">Oracle E-Business Suite / Enterprise Asset Management</span></li>
</ul>

        <h3>Yer Aldığım Bazı EBS Projeleri / My EBS Projects</h3>
        <p class="project-highlight">KOVAN Yerli Milli ERP Projesi (Ürün Yönetimi)</p>
        
        <div class="projects-grid">
          <div class="project-card">
            <ul>
              <li>Türk Traktör (Migration R12)</li>
              <li>Tekfen (Upgrade R12)</li>
              <li>Kıraça Holding (Migration R12)</li>
              <li>Yüksel İnşaat A.Ş. (Migration R12)</li>
              <li>Türk Traktör (Oracle ASCP)</li>
              <li>Roketsan (MIGYEM)</li>
              <li>Erkunt Traktör</li>
              <li>Baymina Enerji</li>
              <li>Turkcell (Destek)</li>
            </ul>
          </div>
          <div class="project-card">
            <ul>
              <li>İzdemir Enerji (Oracle EAM)</li>
              <li>Batıçim (MSCA)</li>
              <li>Toyota Boshoku Türkiye</li>
              <li>Roketsan (Oracle EAM)</li>
              <li>Batıçim A.Ş.</li>
              <li>Türk Traktör (Oracle EAM)</li>
              <li>Balıkesir Elektromekanik Sanayi</li>
              <li>Kıraça Holding (Migration R11.5.10.2)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <style>
      .about-container {
        display: flex;
        gap: 4rem;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        padding: 0 1rem;
      }

      .profile-section {
        flex: 0 0 300px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: sticky;
        top: 2rem;
        height: fit-content;
      }

      .profile-image {
        border-radius: 60%;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        background: white;
        position: relative;
        aspect-ratio: 1;
        width: 100%;
        max-width: 280px;
        margin: 0 auto;
        border: 4px solid white;
      }

      .profile-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to bottom, 
          transparent 0%, 
          rgba(0,0,0,0.05) 50%,
          rgba(0,0,0,0.1) 100%
        );
        pointer-events: none;
        border-radius: inherit;
      }

      .profile-image:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 8px 12px rgba(0,0,0,0.1), 0 15px 25px rgba(0,0,0,0.1);
      }

      .profile-image img {
        width: 100%;
        height: 100%;
        display: block;
        transition: transform 0.4s ease;
        object-fit: cover;
        object-position: center top;
      }

      .profile-image:hover img {
        transform: scale(1.08);
      }

      .content-section {
        flex: 1;
      }

      h2 {
        font-size: 2rem;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 1.5rem;
        letter-spacing: -0.5px;
      }

      h3 {
        font-size: 1.5rem;
        color: #334155;
        margin: 2rem 0 1rem;
        letter-spacing: -0.3px;
      }

      .resume-link {
        color: #2563eb;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
      }

      .resume-link:hover {
        color: #1d4ed8;
      }

      .resume-link .arrow {
        transition: transform 0.3s ease;
      }

      .resume-link:hover .arrow {
        transform: translateX(4px);
      }

      .specialties {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }

      .specialty-item {
        display: block;
        padding: 0.75rem 1rem;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-radius: 8px;
        font-size: 0.95rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        color: #475569;
      }

      li:hover .specialty-item {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-color: #3b82f6;
        color: #1e40af;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      }

      .project-highlight {
        font-weight: 500;
        color: #3b82f6;
        margin: 1rem 0;
        padding: 1rem;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border-radius: 8px;
        border: 1px solid #bae6fd;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 1rem;
      }

      .project-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
      }

      .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-color: #3b82f6;
      }

      .project-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .project-card li {
        padding: 0.75rem 0;
        border-bottom: 1px solid #f1f5f9;
        transition: all 0.3s ease;
        color: #475569;
      }

      .project-card li:hover {
        padding-left: 0.5rem;
        background: #f0f9ff;
        color: #3b82f6;
      }

      .project-card li:last-child {
        border-bottom: none;
      }

      @media (max-width: 768px) {
        .about-container {
          flex-direction: column;
        }

        .profile-section {
          position: relative;
          top: 0;
          width: 250px;
          margin: 0 auto;
        }

        .projects-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `
})
export class HomeComponent {} 