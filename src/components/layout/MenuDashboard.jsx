"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Pencil, Trash2, Home } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { firestore } from "@/lib/firebase/init"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function MenuDashboard() {
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [idAttachment, setIdAttachment] = useState("")
    const [editingId, setEditingId] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchMenuItems()
    }, [])

    const fetchMenuItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "menus"))
            const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setMenuItems(items)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching menu items:", error)
            toast.error("Failed to fetch menu items")
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !price || !category || !description) {
            toast.error("Please fill in all required fields")
            return
        }

        const item = {
            name,
            price: Number.parseFloat(price),
            category,
            images: `/images/menus/${category}/${image}.svg`,
            description,
            id: idAttachment,
        }

        try {
            if (editingId) {
                await updateDoc(doc(firestore, "menus", editingId), item)
                toast.success("Menu item updated successfully")
            } else {
                await addDoc(collection(firestore, "menus"), item)
                toast.success("Menu item added successfully")
            }
            fetchMenuItems()
            resetForm()
        } catch (error) {
            console.error("Error saving menu item:", error)
            toast.error("Failed to save menu item")
        }
    }

    const handleEdit = (item) => {
        setName(item.name)
        setPrice(item.price.toString())
        setCategory(item.category)
        setImage(item.image)
        setDescription(item.description)
        setIdAttachment(item.idAttachment)
        setEditingId(item.id)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteDoc(doc(firestore, "menus", id))
                toast.success("Menu item deleted successfully")
                fetchMenuItems()
            } catch (error) {
                console.error("Error deleting menu item:", error)
                toast.error("Failed to delete menu item")
            }
        }
    }

    const resetForm = () => {
        setName("")
        setPrice("")
        setCategory("")
        setImage("")
        setDescription("")
        setIdAttachment("")
        setEditingId(null)
    }

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Menu Dashboard</h1>
                <Button onClick={() => router.push("/")} variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>{editingId ? "Edit Menu Item" : "Add New Menu Item"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter item name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (Rp)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter price"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ayam">Ayam</SelectItem>
                                        <SelectItem value="bebek">Bebek</SelectItem>
                                        <SelectItem value="cumi">Cumi</SelectItem>
                                        <SelectItem value="ikan">Ikan</SelectItem>
                                        <SelectItem value="minuman">Minuman</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="images">Image Name</Label>
                                <Input
                                    id="images"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="Enter image name (without extension)"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter item description"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="idAttachment">ID Attachment</Label>
                                <Input
                                    id="idAttachment"
                                    value={idAttachment}
                                    onChange={(e) => setIdAttachment(e.target.value)}
                                    placeholder="Enter ID Attachment"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            {editingId ? "Update Item" : "Add Item"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Menu Items</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center h-32">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="w-32">Price</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {menuItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="w-32">Rp {item.price.toLocaleString()}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                                                    <Pencil className="w-4 h-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <ToastContainer position="bottom-right" />
        </div>
    )
}

