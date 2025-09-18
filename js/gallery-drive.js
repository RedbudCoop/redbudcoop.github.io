// js/gallery-drive.js

class GoogleDriveGallery {
    constructor() {
        // Replace with your actual API key and folder ID
        this.API_KEY = 'AIzaSyBI5VCn91GN8P5MLcfHa46htbUvXsjlDgA';
        this.FOLDER_ID = '16TJysWpDR3fYk-8LMLYcvz5T7vwhlJEp';
        this.photosContainer = document.getElementById('photos');
        this.loadingDiv = document.getElementById('loading');
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadPhotos();
        } catch (error) {
            console.error('Error loading photos:', error);
            this.showError('Failed to load photos. Please check the console for details.');
        }
    }
    
    async loadPhotos() {
        const url = `https://www.googleapis.com/drive/v3/files?key=${this.API_KEY}&q='${this.FOLDER_ID}'+in+parents&fields=files(id,name,createdTime,thumbnailLink,webContentLink,mimeType)&orderBy=createdTime desc`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const imageFiles = data.files.filter(file => 
                file.mimeType && file.mimeType.startsWith('image/')
            );
            
            this.displayPhotos(imageFiles);
        } catch (error) {
            throw new Error(`Failed to fetch from Google Drive API: ${error.message}`);
        }
    }
    
    displayPhotos(files) {
        this.photosContainer.innerHTML = '';
        
        if (files.length === 0) {
            this.photosContainer.innerHTML = '<p>No photos found. Upload some to the shared folder!</p>';
            this.hideLoading();
            return;
        }
        
        files.forEach((file, index) => {
            const img = document.createElement('img');
            img.alt = file.name;
            img.loading = 'lazy';
            
            // Use thumbnail for loading, full image for viewing
            const thumbnailUrl = this.getThumbnailUrl(file);
            const fullImageUrl = this.getDirectImageUrl(file);
            
            img.src = thumbnailUrl;
            img.dataset.fullSrc = fullImageUrl;
            img.dataset.fileName = file.name;
            img.dataset.createdTime = file.createdTime;
            
            // Add click handler for lightbox/full view
            img.addEventListener('click', () => this.openLightbox(img));
            
            // Add load event to hide loading when first image loads
            if (index === 0) {
                img.addEventListener('load', () => this.hideLoading());
            }
            
            this.photosContainer.appendChild(img);
        });
    }
    
    getThumbnailUrl(file) {
        if (file.thumbnailLink) {
            // Get a larger thumbnail by modifying the size parameter
            return file.thumbnailLink.replace('=s220', '=s800');
        }
        return this.getDirectImageUrl(file);
    }
    
    getDirectImageUrl(file) {
        return `https://drive.google.com/thumbnail?id=${file.id}&sz=w1920-h1080`;
    }
    
    openLightbox(img) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.dataset.fullSrc;
        lightboxImg.alt = img.dataset.fileName;
        lightboxImg.style.cssText = `
            max-width: 95vw;
            max-height: 95vh;
            object-fit: contain;
        `;
        
        const caption = document.createElement('div');
        caption.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            background: rgba(0,0,0,0.7);
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
        `;
        
        const date = new Date(img.dataset.createdTime);
        caption.textContent = `${img.dataset.fileName} - ${date.toLocaleDateString()}`;
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(caption);
        document.body.appendChild(lightbox);
        
        // Close on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Close on escape key
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);
    }
    
    hideLoading() {
        if (this.loadingDiv) {
            this.loadingDiv.style.opacity = '0';
            setTimeout(() => {
                this.loadingDiv.style.display = 'none';
            }, 1000);
        }
    }
    
    showError(message) {
        this.photosContainer.innerHTML = `<p style="color: red; text-align: center;">${message}</p>`;
        this.hideLoading();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new GoogleDriveGallery();
});