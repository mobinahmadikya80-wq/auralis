import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { FloatingDock } from './components/layout/FloatingDock';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { SidebarDrawer } from './components/layout/SidebarDrawer';

// Eager load critical entry page
import { HomePage } from './components/pages/HomePage';

// Lazy load heavy modules & secondary views for optimal bundle splitting
const ResourceHub = lazy(() => import('./components/ResourceHub').then(m => ({ default: m.ResourceHub })));
const InteractiveEarAnatomy = lazy(() => import('./components/InteractiveEarAnatomy').then(m => ({ default: m.InteractiveEarAnatomy })));
const AudiogramSimulator = lazy(() => import('./components/AudiogramSimulator').then(m => ({ default: m.AudiogramSimulator })));
const ToolsSuite = lazy(() => import('./components/ToolsSuite').then(m => ({ default: m.ToolsSuite })));
const ClinicalCasesView = lazy(() => import('./components/ClinicalCasesView').then(m => ({ default: m.ClinicalCasesView })));
const AiTutor = lazy(() => import('./components/AiTutor').then(m => ({ default: m.AiTutor })));
const SavedWorkspace = lazy(() => import('./components/SavedWorkspace').then(m => ({ default: m.SavedWorkspace })));

const CoursesPage = lazy(() => import('./components/pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const RecentUploadsPage = lazy(() => import('./components/pages/RecentUploadsPage').then(m => ({ default: m.RecentUploadsPage })));
const TeachersPage = lazy(() => import('./components/pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const VideosPage = lazy(() => import('./components/pages/VideosPage').then(m => ({ default: m.VideosPage })));
const PdfPage = lazy(() => import('./components/pages/PdfPage').then(m => ({ default: m.PdfPage })));
const /SlidesPage = lazy(() => import('./components/pages/SlidesPage').then(m => ({ default: m.SlidesPage })));
